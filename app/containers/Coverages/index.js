/**
 *
 * Coverages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AddCoverageDialog from 'components/AddCoverageDialog';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PanelToolbar from 'components/PanelToolbar';
import CoverageTable from 'components/CoverageTable';
import { getLookupsAction } from 'containers/App/actions';
import {
  POLICYHOLDER_RELATIONSHIP,
  FM_STATUS,
  COVERAGE_TYPE,
  PATIENT_ROLE_CODE,
  CARE_COORDINATOR_ROLE_CODE,
} from 'containers/App/constants';
import {
  makeSelectCoverageType,
  makeSelectCoverageFmStatus,
  makeSelectPolicyHolderRelationship,
} from 'containers/App/lookupSelectors';

import {
  getSaveCoverageAction,
  getSubscriberOptions,
} from 'containers/Coverages/actions';

import { makeSelectPatient } from 'containers/App/contextSelectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectSubscriptionOptions } from './selectors';


export class Coverages extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleSaveCoverage = this.handleSaveCoverage.bind(this);
  }

  componentDidMount() {
    const { patient } = this.props;
    this.props.getLookups();
    this.props.getSubscriberOptions(patient.id);
  }
  handleClick() {
    this.setState({ open: true });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }
  handleSaveCoverage(coverageData, actions) {
    this.props.onSaveCoverage(coverageData, () => actions.setSubmitting(false));
    this.setState({ open: false });
  }
  render() {
    const { coverageType, coverageFmStatus, policyHolderRelationship, subscriptionOptions, patient } = this.props;
    const addNewItem = {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        onClick: this.handleClick,
      },
    };

    const addCoverageDialogProps = {
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      patient,
      open: this.state.open,
      handleDialogClose: this.handleDialogClose,
      handleSaveCoverage: this.handleSaveCoverage,
    };
    return (
      <div>
        <PanelToolbar
          {...addNewItem}
          allowedAddNewItemRoles={[PATIENT_ROLE_CODE, CARE_COORDINATOR_ROLE_CODE]}
        />
        <CoverageTable></CoverageTable>
        <AddCoverageDialog {...addCoverageDialogProps}></AddCoverageDialog>
      </div>
    );
  }
}

Coverages.propTypes = {
  getLookups: PropTypes.func.isRequired,
  getSubscriberOptions: PropTypes.func.isRequired,
  onSaveCoverage: PropTypes.func.isRequired,
  coverageType: PropTypes.array.isRequired,
  coverageFmStatus: PropTypes.array.isRequired,
  policyHolderRelationship: PropTypes.array.isRequired,
  subscriptionOptions: PropTypes.array.isRequired,
  patient: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  policyHolderRelationship: makeSelectPolicyHolderRelationship(),
  coverageFmStatus: makeSelectCoverageFmStatus(),
  coverageType: makeSelectCoverageType(),
  patient: makeSelectPatient(),
  subscriptionOptions: makeSelectSubscriptionOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([POLICYHOLDER_RELATIONSHIP, FM_STATUS, COVERAGE_TYPE])),
    getSubscriberOptions: (patientId) => dispatch(getSubscriberOptions(patientId)),
    onSaveCoverage: (coverageData, handleSubmitting) => dispatch(getSaveCoverageAction(coverageData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'coverages', reducer });
const withSaga = injectSaga({ key: 'coverages', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Coverages);
