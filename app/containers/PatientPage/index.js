/**
 *
 * PatientPage
 *
 */

import renderCalendarComponent from 'components/Calendar/render';
import GoldenLayout from 'components/GoldenLayout';

import Page from 'components/Page';
import PatientDetails from 'components/PatientDetails';
import { getPatient, refreshPatient } from 'containers/App/contextActions';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import renderCareTeamsComponent from 'containers/CareTeams/render';
import renderCommunicationsComponent from 'containers/Communications/render';
import renderCoverageComponent from 'containers/Coverages/render';
import renderPatientAppointmentsComponent from 'containers/PatientAppointments/render';
import renderPatientToDosComponent from 'containers/PatientToDos/render';
import { flattenPatientData } from 'containers/PatientWorkspacePage/helpers';
import SmartAppLauncher from 'containers/SmartAppLauncher';
import renderTasksComponent from 'containers/Tasks/render';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ORGANIZATION_ADMIN_ROLE_CODE } from '../App/constants';


export const orgAdminStateMetadata =
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
      borderWidth: 10,
      minItemHeight: 400,
      minItemWidth: 200,
      headerHeight: 30,
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
      type: 'column',
      content: [
        {
          type: 'row',
          height: 50,
          content: [{
            type: 'column',
            content: [{
              type: 'stack',
              content: [
                {
                  title: 'Patient\'s TO DO',
                  type: 'component',
                  componentName: 'toDos',
                  isClosable: true,
                  reorderEnabled: true,
                },
                {
                  title: 'Patient\'s Tasks',
                  type: 'component',
                  componentName: 'tasks',
                  isClosable: true,
                  reorderEnabled: true,
                },
              ],
            }],
          }, {
            title: 'Patient\'s Care teams',
            type: 'component',
            componentName: 'careTeams',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        },
        {
          type: 'row',
          height: 50,
          content: [
            {
              title: 'Patient\'s Communications',
              type: 'component',
              componentName: 'communications',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Patient\'s Insurance/Benefits',
              type: 'component',
              componentName: 'coverage',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
        },
      ],
    }],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

export const defaultRoleStateMetadata =
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
      borderWidth: 10,
      minItemHeight: 400,
      minItemWidth: 200,
      headerHeight: 30,
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
      type: 'column',
      content: [
        {
          type: 'row',
          height: 50,
          content: [{
            type: 'column',
            content: [{
              type: 'stack',
              content: [
                {
                  title: 'Patient\'s TO DO',
                  type: 'component',
                  componentName: 'toDos',
                  isClosable: true,
                  reorderEnabled: true,
                },
                {
                  title: 'Patient\'s Tasks',
                  type: 'component',
                  componentName: 'tasks',
                  isClosable: true,
                  reorderEnabled: true,
                },
              ],
            }],
          }, {
            title: 'Patient\'s Appointments',
            type: 'component',
            componentName: 'appointments',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        },
        {
          type: 'row',
          height: 50,
          content: [
            {
              title: 'Patient\'s Care teams',
              type: 'component',
              componentName: 'careTeams',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Patient\'s Communications',
              type: 'component',
              componentName: 'communications',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Patient\'s Insurance/Benefits',
              type: 'component',
              componentName: 'coverage',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
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
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasksComponent },
  { name: 'appointments', text: 'Appointments', factoryMethod: renderPatientAppointmentsComponent },
  { name: 'communications', text: 'Communications', factoryMethod: renderCommunicationsComponent },
  { name: 'toDos', text: 'To Do', factoryMethod: renderPatientToDosComponent },
  { name: 'coverage', text: 'Coverage', factoryMethod: renderCoverageComponent },
  { name: 'calendar', text: 'Calendar', factoryMethod: renderCalendarComponent },
  { name: 'careTeams', text: 'Care teams', factoryMethod: renderCareTeamsComponent },
];

export class PatientPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const patientId = this.props.match.params.id;
    const { patient } = this.props;
    if (patient && patient.id && patient.id === patientId) {
      this.props.refreshPatient();
    } else {
      this.props.getPatient(patientId);
    }
  }

  getStateMetadataForRole() {
    const { user: { role } } = this.props;
    switch (role) {
      case ORGANIZATION_ADMIN_ROLE_CODE:
        return orgAdminStateMetadata;
      default:
        return defaultRoleStateMetadata;
    }
  }

  render() {
    const { patient } = this.props;
    const patientDetailsProps = { patient };

    const stateMetadata = this.getStateMetadataForRole();
    return (
      <Page>
        <Helmet>
          <title>Patient</title>
          <meta name="description" content="Patient page of Omnibus Care Plan application" />
        </Helmet>

        {patient &&
        <div>
          <PatientDetails
            {...patientDetailsProps}
            flattenPatientData={flattenPatientData}
          />
          <SmartAppLauncher />
          <GoldenLayout
            containerId="golden-patient"
            containerHeight="75vh"
            containerWidth="95vw"
            componentMetadata={componentMetadata}
            stateMetadata={stateMetadata}
          />
        </div>}
      </Page>
    );
  }
}

PatientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  refreshPatient: PropTypes.func,
  getPatient: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    refreshPatient: () => dispatch(refreshPatient()),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(PatientPage);
