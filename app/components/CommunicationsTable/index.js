/**
 *
 * CommunicationsTable
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import isEmpty from 'lodash/isEmpty';

import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import Table from 'components/Table';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StyledIconButton from 'components/StyledIconButton';
import messages from './messages';

const tableColumns = 'repeat(6, 1fr) 50px';

function CommunicationsTable(props) {
  const { loading, data, selectedPatientId, manageCommunicationBaseUrl } = props.communicationsData;
  return (
    <div>
      {loading && <RefreshIndicatorLoading />}
      {(!loading && data.elements &&
        data.elements.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={tableColumns} relativeTop={props.relativeTop}>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategory} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderContactMethod} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderRecipients} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderSender} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderSent} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(data.elements) && data.elements.map((communication) => (
                <TableRow key={communication.logicalId} columns={tableColumns}>
                  <TableRowColumn>{communication.categoryValue}</TableRowColumn>
                  <TableRowColumn>{communication.mediumValue}</TableRowColumn>
                  <TableRowColumn> {getRecipientsList(communication.recipient)}</TableRowColumn>
                  <TableRowColumn>{communication.sender.display}</TableRowColumn>
                  <TableRowColumn>{communication.sent}</TableRowColumn>
                  <TableRowColumn>{communication.statusValue}</TableRowColumn>
                  <TableRowColumn>
                    <Grid columns="1fr 50px" gap="0px">
                      <Cell left="2">
                        <IconMenu
                          iconButtonElement={
                            (<StyledIconButton>
                              <NavigationMenu />
                            </StyledIconButton>)
                          }
                          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        >
                          <MenuItem
                            primaryText="Edit"
                            containerElement={<Link
                              to={{
                                pathname: `${manageCommunicationBaseUrl}/${communication.logicalId}`,
                                search: `?patientId=${selectedPatientId}`,
                              }}
                            />}
                          />
                        </IconMenu>
                      </Cell>
                    </Grid>
                  </TableRowColumn>
                </TableRow>
              ))}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              onChange={props.handleChangePage}
              boundaryPagesRange={1}
              siblingPagesRange={1}
              hidePreviousAndNextPageLinks={false}
              hideFirstAndLastPageLinks={false}
              hideEllipsis={false}
            />
          </div> :
          (<CenterAlign>
            <NoResultsFoundText><FormattedMessage {...messages.noCommunications} /></NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

CommunicationsTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  communicationsData: PropTypes.shape({
    manageCommunicationBaseUrl: PropTypes.string.isRequired,
    selectedPatientId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      currentPage: PropTypes.number,
      totalNumberOfPages: PropTypes.number,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      elements: PropTypes.array,
    }).isRequired,
  }).isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default CommunicationsTable;

function getRecipientsList(recipients) {
  const names = [];
  if (recipients) {
    recipients.forEach((entry) => {
      if (entry.display) {
        names.push(entry.display);
      }
    });
  }
  return names.join(',');
}
