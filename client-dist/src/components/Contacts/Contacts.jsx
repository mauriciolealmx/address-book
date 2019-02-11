import React from 'react';
import classNames from 'classnames';
import { AutoSizer, Column, Table } from 'react-virtualized';

import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';

import columnsConfig from './Contacts.config';
import styles from './Contacts.styles';

class VirtualizedTable extends React.PureComponent {
  headerHeight = 56;

  rowHeight = 56;

  getRowClassName = ({ index }) => {
    const { rowClassName } = this.props;
    // Hover color will only show if rows have a onRowClick callback.
    return classNames(styles.tableRow, styles.flexContainer, rowClassName, {
      [styles.tableRowHover]: index !== -1 && this.handleRowClick,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { onRowClick } = this.props;
    const isNumeric = (columnIndex && columnsConfig[columnIndex].numeric) || false;
    return (
      <TableCell
        className={classNames(styles.tableCell, styles.flexContainer, { [styles.noClick]: onRowClick == null })}
        component="div"
        numeric={isNumeric}
        style={{ height: this.rowHeight }}
        variant="body"
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const isNumeric = (columnIndex && columnsConfig[columnIndex].numeric) || false;
    return (
      <TableCell
        className={classNames(styles.tableCell, styles.flexContainer, styles.noClick)}
        component="div"
        numeric={isNumeric}
        style={{ height: this.headerHeight }}
        variant="head"
      >
        {label}
      </TableCell>
    );
  };

  columnRendered = columns => {
    return columns.map(({ className, dataKey, ...other }, index) => (
      <Column
        key={dataKey}
        headerRenderer={headerProps =>
          this.headerRenderer({
            ...headerProps,
            columnIndex: index,
          })
        }
        className={classNames(styles.flexContainer, className)}
        cellRenderer={this.cellRenderer}
        dataKey={dataKey}
        {...other}
      />
    ));
  }

  render() {
    const { contacts } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={styles.table}
            headerHeight={this.headerHeight}
            height={height}
            onRowClick={this.handleRowClick}
            rowClassName={this.getRowClassName}
            rowCount={contacts.length}
            rowGetter={({ index }) => contacts[index]}
            rowHeight={this.rowHeight}
            width={width}
          >
            {this.columnRendered(columnsConfig)}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

export default ({ contacts }) => (
  <Paper className={styles.paperRoot}>
    <VirtualizedTable contacts={contacts} />
  </Paper>
);
