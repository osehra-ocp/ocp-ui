/**
 *
 * ManagePractitionerPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Divider from 'material-ui/Divider';
import find from 'lodash/find';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import ManagePractitioner from '../../components/ManagePractitioner';
import messages from './messages';
import styles from './styles.css';
import {
  makeSelectPractitionerIdentifierSystems,
  makeSelectPractitionerRoles,
  makeSelectTelecomSystems,
  makeSelectUspsStates,
} from '../App/selectors';
import { PRACTITIONERIDENTIFIERSYSTEM, PRACTITIONERROLES, TELECOMSYSTEM, USPSSTATES } from '../App/constants';
import { getLookupsAction } from '../App/actions';
import { savePractitioner } from './actions';
import { makeSelectSearchResult } from '../Practitioners/selectors';

export class ManagePractitionerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this.props.getLookUpFormData();
  }

  handleSave(practitionerFormData, actions) {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      merge(practitionerFormData, { logicalId });
    }
    this.props.onSaveForm(practitionerFormData, () => actions.setSubmitting(false));
  }

  render() {
    const { match, uspsStates, identifierSystems, telecomSystems, practitionerRoles, practitioners } = this.props;
    const practitionerLogicalId = match.params.id;
    let practitioner = null;
    if (practitionerLogicalId) {
      practitioner = getPractitionerById(practitioners, practitionerLogicalId);
    }
    const formProps = {
      uspsStates,
      identifierSystems,
      telecomSystems,
      practitionerRoles,
      practitioner,
    };
    return (
      <div className={styles.wrapper}>
        <Helmet>
          <title>Manage Practitioner</title>
          <meta name="description" content="Manage practitioner page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.card}>
          <h4 className={styles.font}>
            {practitionerLogicalId ? <FormattedMessage {...messages.editHeader} />
              : <FormattedMessage {...messages.createHeader} />}
          </h4>
          <Divider />
          <ManagePractitioner {...formProps} onSave={this.handleSave} />
        </div>
      </div>
    );
  }
}

ManagePractitionerPage.propTypes = {
  match: PropTypes.object,
  getLookUpFormData: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  identifierSystems: PropTypes.array,
  telecomSystems: PropTypes.array,
  practitionerRoles: PropTypes.array,
  practitioners: PropTypes.any,
  onSaveForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  identifierSystems: makeSelectPractitionerIdentifierSystems(),
  telecomSystems: makeSelectTelecomSystems(),
  practitionerRoles: makeSelectPractitionerRoles(),
  practitioners: makeSelectSearchResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookUpFormData: () => dispatch(getLookupsAction([USPSSTATES, PRACTITIONERIDENTIFIERSYSTEM, TELECOMSYSTEM, PRACTITIONERROLES])),
    onSaveForm: (practitionerFormData, handleSubmitting) => dispatch(savePractitioner(practitionerFormData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managePractitionerPage', reducer });
const withSaga = injectSaga({ key: 'managePractitionerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePractitionerPage);

function getPractitionerById(practitionerSearchResult, logicalId) {
  return find(practitionerSearchResult, { logicalId });
}