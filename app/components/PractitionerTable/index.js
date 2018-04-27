/**
 *
 * PractitionerTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import sizeMeHOC from 'utils/SizeMeUtils';
import RecordsRange from 'components/RecordsRange';
import { MANAGE_PRACTITIONER_URL } from 'containers/App/constants';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';
import { EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS, SUMMARY_PANEL_WIDTH } from './constants';

function PractitionerTable(props) {
  const { relativeTop, practitionersData, size, combineAddress, mapToTelecoms } = props;
  const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_PANEL_WIDTH);
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;

  return (
    <div>
      {practitionersData.loading && <RefreshIndicatorLoading />}
      {(!practitionersData.loading && practitionersData.data &&
        practitionersData.data.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={columns} relativeTop={relativeTop}>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnFirstName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnLastName} /></TableHeaderColumn>
                {isExpanded &&
                  <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
                }
                {isExpanded &&
                  <TableHeaderColumn > <FormattedMessage {...messages.tableColumnHeaderTelecom} /></TableHeaderColumn>
                }
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
                { isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
                }
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAction} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(practitionersData.data) && practitionersData.data.map((practitioner) => {
                const { name, active, identifiers, addresses, telecoms } = practitioner;
                const address = addresses && addresses.length > 0 ? combineAddress(addresses[0]) : '';
                const contact = telecoms && telecoms.length > 0 ? mapToTelecoms(telecoms.slice(0, 1)) : '';
                const menuItems = [{
                  primaryText: <FormattedMessage {...messages.edit} />,
                  linkTo: `${MANAGE_PRACTITIONER_URL}/${practitioner.logicalId}`,
                }];
                return (
                  <TableRow
                    columns={columns}
                    key={uniqueId()}
                  >
                    <TableRowColumn>{renderFirstName(name)}</TableRowColumn>
                    <TableRowColumn>{renderLastName(name)}</TableRowColumn>
                    {isExpanded ?
                      <TableRowColumn>{address}</TableRowColumn> : null
                    }
                    {isExpanded ? <TableRowColumn>{contact}</TableRowColumn> : null
                    }
                    <TableRowColumn>
                      {active ?
                        <FormattedMessage {...messages.active} /> :
                        <FormattedMessage {...messages.inactive} />
                      }
                    </TableRowColumn>
                    {isExpanded &&
                    <TableRowColumn>{identifiers}</TableRowColumn>
                    }
                    <TableRowColumn>
                      <NavigationIconMenu menuItems={menuItems} />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={practitionersData.currentPage}
              totalPages={practitionersData.totalNumberOfPages}
              onChange={practitionersData.handleChangePage}
            />
            <RecordsRange
              currentPage={practitionersData.currentPage}
              totalPages={practitionersData.totalNumberOfPages}
              totalElements={practitionersData.totalElements}
              currentPageSize={practitionersData.currentPageSize}
            />
          </div> :
          (<CenterAlign>
            <NoResultsFoundText>No practitioners found</NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

function renderFirstName(names) {
  return names && names.map((name) => (<div key={uniqueId()}>{name.firstName}</div>));
}

function renderLastName(names) {
  return names && names.map((name) => (<div key={uniqueId()}>{name.lastName}</div>));
}

PractitionerTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  size: PropTypes.object.isRequired,
  practitionersData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.string,
      active: PropTypes.bool,
      name: PropTypes.array,
      addresses: PropTypes.arrayOf(PropTypes.shape({
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        stateCode: PropTypes.string,
        postalCode: PropTypes.string,
        countryCode: PropTypes.string,
        use: PropTypes.string,
      })),
      telecoms: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        value: PropTypes.string,
        use: PropTypes.string,
      })),
      practitionerRoles: PropTypes.array,
    })).isRequired,
  }),
  combineAddress: PropTypes.func.isRequired,
  mapToTelecoms: PropTypes.func.isRequired,
};

export default sizeMeHOC(PractitionerTable);
