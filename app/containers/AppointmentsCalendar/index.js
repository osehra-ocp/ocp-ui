/**
 *
 * AppointmentsCalendar
 *
 */

import Close from '@material-ui/icons/Close';
import Calendar from 'components/Calendar';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledDialog from 'components/StyledDialog';
import StyledIconButton from 'components/StyledIconButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledTooltip from 'components/StyledTooltip';
import { getLookupsAction } from 'containers/App/actions';

import { APPOINTMENT_STATUS, APPOINTMENT_TYPE, MANAGE_APPOINTMENT_URL } from 'containers/App/constants';
import { getPatient, refreshPatient } from 'containers/App/contextActions';
import messages from 'containers/AppointmentsCalendar/messages';
import isEmpty from 'lodash/isEmpty';
import { DialogContent, DialogTitle } from 'material-ui-next';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell, Grid } from 'styled-css-grid';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getAppointments, getOutlookAppointments } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectAppointmentsCalendar from './selectors';

export class AppointmentsCalendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      cannotEditModalOpen: false,
      confirmEditModalOpen: false,
      editAppointmentURL: '',
      patientId: '',
    };
    this.handleCloseCannotEditDialog = this.handleCloseCannotEditDialog.bind(this);
    this.handleCloseConfirmEditDialog = this.handleCloseConfirmEditDialog.bind(this);
    this.navigateToEditAppointment = this.navigateToEditAppointment.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.props.getAppointments();
    this.props.getOutlookAppointments();
  }

  openModal(appointment, patientId) {
    if (appointment.isOutlookAppointment) {
      this.setState({ cannotEditModalOpen: true });
    } else {
      this.setState({ editAppointmentURL: appointment.editUrl });
      this.setState({ patientId });
      this.setState({ confirmEditModalOpen: true });
    }
  }

  navigateToEditAppointment() {
    this.props.getPatient(this.state.patientId);
    this.props.history.push(this.state.editAppointmentURL);
  }

  handleCloseCannotEditDialog() {
    this.setState({ cannotEditModalOpen: false });
  }

  handleCloseConfirmEditDialog() {
    this.setState({ confirmEditModalOpen: false });
  }

  render() {
    const { appointmentsCalendar: { data, outlookData } } = this.props;
    return (
      <div>
        {!isEmpty(data) &&
        <Calendar
          elements={data}
          outlookElements={outlookData}
          manageAppointmentUrl={MANAGE_APPOINTMENT_URL}
          openModal={this.openModal}
        />
        }
        <div>
          <StyledDialog
            open={this.state.cannotEditModalOpen}
            fullWidth
          >
            <DialogTitle>
              <FormattedMessage {...messages.openEvent} />
              <HorizontalAlignment position={'end'}>
                <StyledTooltip title="Close">
                  <StyledIconButton onClick={this.handleCloseCannotEditDialog}>
                    <Close />
                  </StyledIconButton>
                </StyledTooltip>
              </HorizontalAlignment>
            </DialogTitle>
            <DialogContent>
              <Grid columns={1} alignContent="space-between">
                <Cell>
                  <FormattedMessage {...messages.cannotEdit} />
                </Cell>
                <Cell>
                  <HorizontalAlignment position={'end'}>
                    <StyledRaisedButton
                      onClick={this.handleCloseCannotEditDialog}
                    >
                      <FormattedMessage {...messages.dialogButtonLabelOk} />
                    </StyledRaisedButton>
                  </HorizontalAlignment>
                </Cell>
              </Grid>
            </DialogContent>
          </StyledDialog>
        </div>

        <div>
          <StyledDialog
            open={this.state.confirmEditModalOpen}
            fullWidth
          >
            <DialogTitle>
              <FormattedMessage {...messages.openEvent} />
              <HorizontalAlignment position={'end'}>
                <StyledTooltip title="Close">
                  <StyledIconButton onClick={this.handleCloseConfirmEditDialog}>
                    <Close />
                  </StyledIconButton>
                </StyledTooltip>
              </HorizontalAlignment>
            </DialogTitle>
            <DialogContent>
              <Grid columns={1} alignContent="space-between">
                <Cell>
                  <FormattedMessage {...messages.confirmEdit} />
                </Cell>
                <Cell>
                  <HorizontalAlignment position={'end'}>
                    <Grid columns={2} alignContent="space-between">
                      <StyledRaisedButton
                        onClick={this.navigateToEditAppointment}
                      >
                        <FormattedMessage {...messages.dialogButtonLabelEdit} />
                      </StyledRaisedButton>
                      <StyledRaisedButton
                        onClick={this.handleCloseConfirmEditDialog}
                      >
                        <FormattedMessage {...messages.dialogButtonLabelCancel} />
                      </StyledRaisedButton>
                    </Grid>
                  </HorizontalAlignment>
                </Cell>
              </Grid>
            </DialogContent>
          </StyledDialog>
        </div>

      </div>
    )
      ;
  }
}

AppointmentsCalendar.propTypes = {
  getAppointments: PropTypes.func.isRequired,
  getOutlookAppointments: PropTypes.func.isRequired,
  appointmentsCalendar: PropTypes.shape({
    data: PropTypes.array,
    outlookData: PropTypes.array,
  }),
  history: PropTypes.object.isRequired,
  getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appointmentsCalendar: makeSelectAppointmentsCalendar(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAppointments: (query) => dispatch(getAppointments(query)),
    getOutlookAppointments: () => dispatch(getOutlookAppointments()),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    refreshPatient: () => dispatch(refreshPatient()),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'appointmentsCalendar', reducer });
const withSaga = injectSaga({ key: 'appointmentsCalendar', saga });

const reduxCompose = compose(
  withReducer,
  withSaga,
  withConnect,
)(AppointmentsCalendar);

export default withRouter(reduxCompose);
