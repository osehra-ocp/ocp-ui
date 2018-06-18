/**
 *
 * TableRowColumn
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowColumn = styled.div`
  color: #666;
  font-family: "Arial", sans-serif;
  font-style: normal;
  font-size: 12px;
  font-weight: 400;
  line-height: 200%;
  text-align: left;
  margin: 0;
  word-break: break-word;
  padding: 5px;
`;

TableRowColumn.propTypes = {
  children: PropTypes.node,
};

export default TableRowColumn;
