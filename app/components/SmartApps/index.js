/**
 *
 * SmartApps
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { Cell, Grid } from 'styled-css-grid';
import Padding from 'components/Padding';
import PanelSection from 'components/PanelSection';
import StyledText from 'components/StyledText';
import SmartAppsGallery from 'components/SmartAppsGallery';
import LaunchButton from './LaunchButton';


class SmartApps extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleLaunch = this.handleLaunch.bind(this);
  }

  handleLaunch(clientId) {
    this.props.onCreateLaunch(clientId);
  }

  render() {
    const { onCreateLaunch, smartApps, config, appShortcuts } = this.props;
    const registeredAppShortcuts = smartApps.filter((app) => appShortcuts.clientIds.includes(app.clientId));
    return (
      <PanelSection>
        <Padding left={5} right={5} top={5} bottom={5}>
          <Grid gap="10px" columns="repeat(auto-fit, minmax(100px,150px))">
            {registeredAppShortcuts && registeredAppShortcuts.map(({ clientId, clientName, appIcon }) => (
              <Cell key={clientId}>
                <LaunchButton onClick={() => this.handleLaunch(clientId)}>
                  <Avatar size={25} src={`data:image/png;base64,${appIcon}`} />
                  <StyledText fontWeight={600} whiteSpace>
                    {clientName}
                  </StyledText>
                </LaunchButton>
              </Cell>
            ))}
            <Cell>
              <SmartAppsGallery
                smartApps={smartApps}
                onCreateLaunch={onCreateLaunch}
                config={config}
              />
            </Cell>
          </Grid>
        </Padding>
      </PanelSection>
    );
  }
}

SmartApps.propTypes = {
  onCreateLaunch: PropTypes.func.isRequired,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })).isRequired,
  config: PropTypes.shape({
    oauth2: PropTypes.shape({
      authorizationServerEndpoint: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  appShortcuts: PropTypes.shape({
    clientIds: PropTypes.array,
  }),
};

export default SmartApps;
