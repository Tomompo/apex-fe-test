import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {GridsterConfig, GridsterItem} from "angular-gridster2";
import * as Highcharts from "highcharts";
import {DataTableComponent} from "../data-table/data-table.component";
import { Chart } from 'highcharts';

interface APEXGridsterItem extends GridsterItem {
  type: string;
  data: any[];
  id: number;
}

enum WidgetType {
  CHART = 'chart',
  TABLE = 'table',
}

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss']
})
export class GridsterComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('chartCont') chartCont: ElementRef<HTMLDivElement>;

  // @ts-ignore
  @ViewChildren('table') tables: QueryList<DataTableComponent>;

  options: GridsterConfig = {};
  dashboard: APEXGridsterItem[] = [];
  ngxRows: any[] = [];
  ngxColumns: any[] = [];

  reloadTimeOut: any = null;

  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  res(i?: GridsterItem): void {
    clearTimeout(this.reloadTimeOut);

    this.reloadTimeOut = setTimeout(() => {
      this.tables.forEach((t) => t.ngOnInit());
      this.charts.forEach((c) => c.reflow());
    }, 250);
  }

  charts: Chart[] = [];

  ngAfterViewInit(): void {
    this.createChart('chart1');
  }

  ngOnInit() {
    this.options = {
      itemResizeCallback: (i) => this.res(i),
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
      emptyCellContextMenuCallback: () => {
        this.addItem();
      },
      enableEmptyCellContextMenu: true,
      minCols: 30,
      maxCols: 30,
      minRows: 20,
      maxRows: 20,
      margin: 5,
      defaultItemRows: 5,
      defaultItemCols: 4,
      minItemCols: 4,
      minItemRows: 2,
    };

    this.dashboard = [
      {cols: 7, rows: 6, y: 0, x: 0, type: 'table', id: 0, data: [] },
      {cols: 7, rows: 6, y: 0, x: 10, type: 'chart', id: 1, data: [] }
    ];

    // NGX DT
    this.ngxRows = [
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Austin', gender: 'Male', company: 'Swimlane' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Austin', gender: 'Male', company: 'Swimlane' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' }
    ];
    this.ngxColumns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }, { name: 'bliah' }];
  }

  changedOptions() {
    // @ts-ignore
    this.options.api.optionsChanged();
  }

  removeItem(item: any) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    const a = { cols: 7, rows: 6, y: 0, x: 0, type: WidgetType.TABLE, id: new Date().getTime(), data: [] };
    const b = { cols: 7, rows: 6, y: 0, x: 10, type: WidgetType.CHART, id: new Date().getTime(), data: [] };

    const r = Math.floor(Math.random() * 2);

    const toUse = (r === 1) ? a : b;

    this.dashboard.push(toUse);

    if(toUse.type === 'chart') {
      this.createChart('chart' + toUse.id);
    }
  }

  createChart(contId: string): void {
    // as usual required for some reason
    setTimeout(() => {
      const chart = Highcharts.chart(contId as any, {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Fruit Consumption'
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
          title: {
            text: 'Fruit eaten'
          }
        },
        series: [{
          name: 'Jane',
          data: [1, 0, 4]
        }, {
          name: 'John',
          data: [5, 7, 3]
        }]
      } as any);

      this.charts.push(chart);
    });
  }
}
