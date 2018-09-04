import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import LinearProgressIndicator from 'components/LinearProgressIndicator';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import SelectFieldWithoutOnClick from 'components/SelectFieldWithoutOnClick';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CustomErrorText from 'components/CustomErrorText';
import SearchParticipantReferences from './SearchParticipantReferences';
import { checkFieldSelected } from './helpers';
import messages from './messages';

const tableColumns = 'repeat(4, 1fr) 110px';

function OutOfOrgTabContent(props) {
  const { values, onCloseDialog, onSearchParticipantReferences, participantReferences, participantAttendance } = props;
  const { loading, data } = participantReferences;

  function checkRequiredValues() {
    return checkFieldSelected(values, 'attendance');
  }

  return (
    <Form>
      <SearchParticipantReferences onSearchParticipantReferences={onSearchParticipantReferences} />
      <LinearProgressIndicator loading={loading} />
      {
        !loading && data && data.length === 0 &&
        <NoResultsFoundText><FormattedMessage {...messages.searchParticipantsTable.noParticipantsFound} /></NoResultsFoundText>
      }
      {!loading && !isEmpty(data) &&
      <Table margin="10px 0">
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn>
            <FormattedMessage {...messages.searchParticipantsTable.tableHeaderName} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.searchParticipantsTable.tableHeaderNPI} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.searchParticipantsTable.tableHeaderAssociatedOrgs} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.searchParticipantsTable.tableHeaderAttendance} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.searchParticipantsTable.tableHeaderAction} />
          </TableHeaderColumn>
        </TableHeader>
        {data.map((participantReference) => {
          const { display } = participantReference;
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{display}</TableRowColumn>
              <TableRowColumn>{display}</TableRowColumn>
              <TableRowColumn>{display}</TableRowColumn>
              <TableRowColumn>
                <SelectFieldWithoutOnClick
                  fullWidth
                  name="attendance"
                  hintText={<FormattedMessage {...messages.hintText.selectPractitionerAttendance} />}
                >
                  {participantAttendance && participantAttendance.map((entry) =>
                    (<MenuItem
                      key={uniqueId()}
                      value={entry.code}
                      primaryText={entry.display}
                    />),
                  )}
                </SelectFieldWithoutOnClick>
              </TableRowColumn>
              <TableRowColumn>
                <StyledRaisedButton disabled={checkRequiredValues()}>
                  <FormattedMessage {...messages.addButton} />
                </StyledRaisedButton>
              </TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
      }
      {!loading && !isEmpty(data) && checkRequiredValues() &&
      <CustomErrorText>Attendance are required</CustomErrorText>
      }
      <Grid columns={8}>
        <Cell left={8}>
          <StyledFlatButton onClick={onCloseDialog}><FormattedMessage {...messages.cancelButton} /></StyledFlatButton>
        </Cell>
      </Grid>
    </Form>
  );
}

OutOfOrgTabContent.propTypes = {
  participantReferences: PropTypes.shape({
    loading: PropTypes.bool,
    currentPage: PropTypes.number,
    totalNumberOfPages: PropTypes.number,
    data: PropTypes.array,
  }),
  values: PropTypes.object,
  participantAttendance: PropTypes.array.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onSearchParticipantReferences: PropTypes.func.isRequired,
};

export default OutOfOrgTabContent;
