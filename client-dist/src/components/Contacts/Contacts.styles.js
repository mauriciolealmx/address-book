import { style } from 'typestyle';

export default {
  paperRoot: style({
    $debugName: 'root',
    marginTop: 1 * 3,
    height: 400,
    width: 900,
  }),

  tableBodyRoot: style({
    maxHeight: '50px',
  }),

  table: style({
    $debugName: 'table',
    minWidth: 700,
    fontFamily: 'auto', // has a theme
  }),

  tableCell: style({
    flex: 1,
  }),

  tableRow: style({
    cursor: 'pointer',
  }),

  flexContainer: style({
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  }),

  tableRowHover: style({
    '&:hover': {
      backgroundColor: '#eef1ff', // has a theme
    },
  }),

  noClick: style({
    cursor: 'initial',
  }),
};
