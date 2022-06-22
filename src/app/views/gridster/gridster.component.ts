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
import {ngxColumns, ngxRows} from "../../consts/data-table";
import {dashboardDefaults, dashboardConfiguration} from "../../consts/dashboard";
import {basicChart} from "../../consts/basic-chart";

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

  reloadTimeOut: any = null;

  charts: Chart[] = [];

  ngxRows: any[] = ngxRows;
  ngxColumns: any[] = ngxColumns;

  ngAfterViewInit(): void {
    this.dashboard.forEach((item) => {
      if (item.type === WidgetType.CHART) {
        this.createChart(`chart${item.id}`);
      }
    });
  }

  ngOnInit() {
    this.options = {
      ...dashboardConfiguration,
      itemResizeCallback: () => this.resized(),
      itemChangeCallback: () => {
        this.storeDashboard(this.dashboard);
      },
      emptyCellClickCallback: () => {
        this.addItem(WidgetType.CHART);
      },
      emptyCellContextMenuCallback: () => {
        this.addItem(WidgetType.TABLE);
      },
    };

    const storedDB = localStorage.getItem('apex-fe-test:dashboard') || 'null';

    // use stored, or default if none.
    this.dashboard = JSON.parse(storedDB) || dashboardDefaults;
  }

  resized(): void {
    clearTimeout(this.reloadTimeOut);

    this.reloadTimeOut = setTimeout(() => {
      // redraw components, as they do not resize themselves
      this.tables.forEach((t) => t.ngOnInit());
      this.charts.forEach((c) => c.reflow());
      // store new sizes
      this.storeDashboard(this.dashboard);
    }, 500);
  }

  removeItem(event: any, item: any) {
    event.preventDefault();

    this.dashboard.splice(this.dashboard.indexOf(item), 1);

    this.storeDashboard(this.dashboard);
  }

  addItem(type: WidgetType) {
    const chart = { cols: 7, rows: 6, y: 0, x: 10, type: WidgetType.CHART, id: new Date().getTime(), data: [] };
    const table = { cols: 7, rows: 6, y: 0, x: 0, type: WidgetType.TABLE, id: new Date().getTime(), data: [] };

    const use = (type === WidgetType.CHART) ? chart : table;

    this.dashboard.push(use);

    this.storeDashboard(this.dashboard);

    if (type === WidgetType.CHART) {
      this.createChart('chart' + use.id);
    }
  }

  storeDashboard(dashboard: APEXGridsterItem[]): void {
    localStorage.setItem('apex-fe-test:dashboard', JSON.stringify(dashboard));
  }

  createChart(contId: string): void {
    // as usual required for some reason
    setTimeout(() => {
      const chart = Highcharts.chart(contId, basicChart);

      this.charts.push(chart);
    });
  }
}
