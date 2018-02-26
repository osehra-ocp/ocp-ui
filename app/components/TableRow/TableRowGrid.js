import { Grid } from 'styled-css-grid';

const TableRowGrid = Grid.extend`
  border-bottom: 1px outset rgb(51, 51, 51);

  &:nth-child(odd) {
    background-color: #f2f2f2;
  }

  &:first-child {
    background-color: #f2f2f2;
    font-size: 20px;
  }

  &:hover {
    background-color: #dce4ef;
    cursor: pointer;
  }
`;

TableRowGrid.propTypes = {};

export default TableRowGrid;
