import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';

import { LOCATION_RESOURCE_TYPE } from 'containers/AddAppointmentParticipant/constants';
import SelectField from 'components/SelectField';
import { checkFieldSelected } from './helpers';
import messages from './messages';

function LocationTabContent(props) {
  const {
    formValues,
    resetForm,
    setFieldTouched,
    healthcareServices,
    locations,
    practitioners,
    participantAttendance,
    onGetAvailableHealthcareServices,
    onGetAvailablePractitioners,
  } = props;

  return (
    <Grid columns={4}>
      <Cell>
        <SelectField
          fullWidth
          name="location"
          onChange={(location) => {
            resetForm({ location });
            onGetAvailableHealthcareServices(LOCATION_RESOURCE_TYPE, location);
            onGetAvailablePractitioners(LOCATION_RESOURCE_TYPE, location);
            setFieldTouched('location', true);
          }}
          hintText={<FormattedMessage {...messages.hintText.selectLocation} />}
          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectLocation} />}
        >
          {locations && locations.map((location) => (
            <MenuItem
              key={uniqueId()}
              value={location.reference}
              primaryText={location.display}
            />
          ))}
        </SelectField>
      </Cell>
      <Cell>
        <SelectField
          fullWidth
          name="service"
          disabled={checkFieldSelected(formValues, 'location')}
          hintText={<FormattedMessage {...messages.hintText.selectService} />}
          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectService} />}
        >
          {healthcareServices && healthcareServices.map((service) => (
            <MenuItem
              key={uniqueId()}
              value={service.reference}
              primaryText={service.display}
            />
          ))}
        </SelectField>
      </Cell>
      <Cell>
        <SelectField
          fullWidth
          name="practitioner"
          onChange={(practitioner) => {
            resetForm({
              location: formValues.location,
              service: formValues.service,
              practitioner,
            });
            setFieldTouched('practitioner', true);
          }}
          disabled={checkFieldSelected(formValues, 'location')}
          hintText={<FormattedMessage {...messages.hintText.selectPractitioner} />}
          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectPractitioner} />}
        >
          {practitioners && practitioners.map((entry) => (
            <MenuItem
              key={uniqueId()}
              value={entry.reference}
              primaryText={entry.display}
            />
          ))}
        </SelectField>
      </Cell>
      <Cell>
        <Cell>
          <SelectField
            fullWidth
            name="attendance"
            disabled={checkFieldSelected(formValues, 'practitioner')}
            hintText={<FormattedMessage {...messages.hintText.selectPractitionerAttendance} />}
            floatingLabelText={
              <FormattedMessage {...messages.floatingLabelText.selectPractitionerAttendance} />}
          >
            {participantAttendance && participantAttendance.map((entry) => (
              <MenuItem
                key={uniqueId()}
                value={entry.code}
                primaryText={entry.display}
              />
            ))}
          </SelectField>
        </Cell>
      </Cell>
    </Grid>
  );
}

LocationTabContent.propTypes = {
  formValues: PropTypes.object,
  resetForm: PropTypes.func,
  setFieldTouched: PropTypes.func,
  healthcareServices: PropTypes.array.isRequired,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  participantAttendance: PropTypes.array.isRequired,
  onGetAvailableHealthcareServices: PropTypes.func.isRequired,
  onGetAvailablePractitioners: PropTypes.func.isRequired,
};

export default LocationTabContent;
