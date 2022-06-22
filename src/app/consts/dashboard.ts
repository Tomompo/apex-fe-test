import {GridsterConfig} from "angular-gridster2";

export const dashboardDefaults = [
  {cols: 7, rows: 6, y: 0, x: 0, type: 'table', id: 0, data: [] },
  {cols: 7, rows: 6, y: 0, x: 10, type: 'chart', id: 1, data: [] }
];

// these are just the properties i used for the demo, many more available
export const dashboardConfiguration: GridsterConfig = {
  itemResizeCallback: () => {},
  itemChangeCallback: () => {},
  emptyCellClickCallback: () => {},
  emptyCellContextMenuCallback: () => {},
  displayGrid: 'always',
  gridType: 'fit',
  resizable: {
    enabled: true,
    handles: 	{s: true, e: true, n: true, w: true, se: true, ne:true, sw: true, nw: true},
  },
  swap: false,
  draggable: {
    enabled: true,
    ignoreContent: true,
  },
  enableEmptyCellContextMenu: true,
  enableEmptyCellClick: true,
  minCols: 30,
  maxCols: 30,
  minRows: 20,
  maxRows: 20,
  margin: 5,
  defaultItemRows: 5,
  defaultItemCols: 4,
  minItemCols: 4,
  minItemRows: 2,
}
