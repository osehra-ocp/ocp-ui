/**
 *
 * AdminWorkspacePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import renderOrganizationsComponent from 'containers/Organizations/render';
import renderPractitionersComponent from 'containers/Practitioners/render';
import renderPatientsComponent from 'containers/Patients/render';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import makeSelectAdminWorkspacePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export const initialStateMetadata =
  {
    settings: {
      hasHeaders: true,
      constrainDragToContainer: false,
      reorderEnabled: true,
      selectionEnabled: false,
      popoutWholeStack: false,
      blockedPopoutsThrowError: true,
      closePopoutsOnUnload: true,
      showPopoutIcon: false,
      showMaximiseIcon: true,
      showCloseIcon: true,
      responsiveMode: 'onload',
      tabOverlapAllowance: 0,
      reorderOnTabMenuClick: true,
      tabControlOffset: 10,
    },
    dimensions: {
      borderWidth: 15,
      borderGrabWidth: 15,
      minItemHeight: 200,
      minItemWidth: 400,
      headerHeight: 40,
      dragProxyWidth: 300,
      dragProxyHeight: 200,
    },
    labels: {
      close: 'close',
      maximise: 'maximise',
      minimise: 'minimise',
      popout: 'open in new window',
      popin: 'pop in',
      tabDropdown: 'additional tabs',
    },
    content: [{
      type: 'row',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [
        {
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          content: [{
            title: 'Organizations',
            type: 'component',
            componentName: 'organizations',
            isClosable: true,
            reorderEnabled: true,
          }],
        }, {
          type: 'stack',
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          content: [{
            title: 'Practitioners',
            type: 'component',
            componentName: 'practitioners',
            isClosable: true,
            reorderEnabled: true,
          }],
        }, {
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          content: [{
            title: 'Patients',
            type: 'component',
            componentName: 'patients',
            isClosable: true,
            reorderEnabled: true,
          }],
        },
      ],
    }],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

export const componentMetadata = [
  { name: 'organizations', text: 'Organizations', factoryMethod: renderOrganizationsComponent },
  { name: 'practitioners', text: 'Practitioners', factoryMethod: renderPractitionersComponent },
  { name: 'patients', text: 'PATIENTS', factoryMethod: renderPatientsComponent },
];

export class AdminWorkspacePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Page>
        <Helmet>
          <title>Admin Workspace</title>
          <meta name="description" content="Admin workspace page of Omnibus Care Plan application" />
        </Helmet>
        <GoldenLayout
          containerHeight="85vh"
          containerId="golden-admin-workspace"
          componentMetadata={componentMetadata}
          stateMetadata={initialStateMetadata}
        />
      </Page>
    );
  }
}

AdminWorkspacePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminworkspacepage: makeSelectAdminWorkspacePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'adminWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminWorkspacePage);
