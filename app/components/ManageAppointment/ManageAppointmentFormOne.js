import FormSubtitle from 'components/FormSubtitle';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import ManageAppointmentFormGrid from 'components/ManageAppointment/ManageAppointmentFormGrid';
import SelectField from 'components/SelectField';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { Form } from 'formik';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Cell, Grid } from 'styled-css-grid';
import { mapToPatientName } from 'utils/PatientUtils';
import Util from 'utils/Util';
import { DATE_PICKER_MODE, PATIENTS_URL } from '../../containers/App/constants';
import DatePicker from '../DatePicker';
import TextField from '../TextField';
import messages from './messages';

import SelectedParticipants from './SelectedParticipants';

function ManageAppointmentForm(props) {
  const today = new Date();
  const {
    isSubmitting,
    dirty,
    isValid,
    appointmentTypes,
    handleOpen,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
    selectedPatient,
  } = props;

  const selectedParticipantsProps = {
    selectedParticipants,
    removeParticipant,
  };

  // To check whether has participant
  const hasParticipants = !isEmpty(selectedParticipants);
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

  return (
    <div>
      <Form>
        <ManageAppointmentFormGrid gap="1vw">
          <Cell area="generalInformationSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.title} />
            </FormSubtitle>
          </Cell>
          <Cell area="selectedPatient">
            <InfoSection margin="2vh 0 0 0">
              <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.patientName} />&nbsp;
              </InlineLabel>
              <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(selectedPatient)}</span>
            </InfoSection>
          </Cell>
          <Cell area="description">
            <TextField
              fullWidth
              name="description"
              hintText={<FormattedMessage {...messages.hintText.description} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
            />
          </Cell>
          <Cell area="appointmentType">
            <SelectField
              fullWidth
              name="appointmentType"
              hintText={<FormattedMessage {...messages.hintText.appointmentType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.appointmentType} />}
            >
              {appointmentTypes && appointmentTypes.map((appointmentType) =>
                <MenuItem key={appointmentType.code} value={appointmentType.code} primaryText={appointmentType.display} />,
              )}
            </SelectField>
          </Cell>
          <Cell area="date">
            <DatePicker
              fullWidth
              name="date"
              minDate={today}
              mode={DATE_PICKER_MODE.LANDSCAPE}
              hintText={<FormattedMessage {...messages.hintText.date} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.date} />}
            />
          </Cell>
          <Cell area="startTime">
            <TimePicker
              fullWidth
              name="startTime"
              hintText={<FormattedMessage {...messages.hintText.startTime} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startTime} />}
            />
          </Cell>
          <Cell area="endTime">
            <TimePicker
              fullWidth
              name="endTime"
              hintText={<FormattedMessage {...messages.hintText.endTime} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endTime} />}
            />
          </Cell>

          <Cell area="participantSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.participantTitle} />
            </FormSubtitle>
          </Cell>
          <Cell area="addParticipant">
            <StyledRaisedButton
              fullWidth
              onClick={handleOpen}
              disabled
              label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
            />
          </Cell>
          <Cell area="selectedParticipants">
            <SelectedParticipants {...selectedParticipantsProps} />
          </Cell>
          <Cell area="buttonGroup">
            <Grid columns={2}>
              <Cell>
                <StyledRaisedButton
                  fullWidth
                  type="submit"
                  label="Save"
                  disabled={!reCheckFormDirty(dirty, selectedParticipants, initialSelectedParticipants) || isSubmitting || !isValid || !hasParticipants}
                />
              </Cell>
              <Cell>
                <StyledFlatButton
                  fullWidth
                  label="Cancel"
                  default
                  disabled={isSubmitting}
                  containerElement={<Link to={PATIENTS_URL} />}
                />
              </Cell>
            </Grid>
          </Cell>
        </ManageAppointmentFormGrid>
      </Form>
    </div>
  );
}

ManageAppointmentForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  selectedPatient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  selectedParticipants: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
  appointmentTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default ManageAppointmentForm;

function reCheckFormDirty(dirty, selectedParticipants, originalSelectedParticipants) {
  let isDirty = dirty;
  const identityOfArray = 'memberId';
  if (!Util.isUnorderedArraysEqual(selectedParticipants, originalSelectedParticipants, identityOfArray)) {
    isDirty = true;
  }
  return isDirty;
}
