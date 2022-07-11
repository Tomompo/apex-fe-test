import {Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import Drilldown from "highcharts/modules/drilldown";
import Exporting from "highcharts/modules/exporting";
import { DrillDownService } from "../../services/drill-down-service";
import { firstValueFrom } from "rxjs";
import Treemap from "highcharts/modules/treemap";
import Heatmap from "highcharts/modules/heatmap";
import { IApexTreeRow } from "../../interfaces/chart";
import { drillDownChart } from "../../consts/drill-down";


@Component({
  selector: 'app-dt-drill-down-coupled',
  templateUrl: './dt-drill-down-coupled.component.html',
  styleUrls: ['./dt-drill-down-coupled.component.scss']
})
export class DtDrillDownCoupledComponent implements OnInit {

  loading: boolean = false;

  ngxRows: IApexTreeRow[] = [];

  depthMap: Map<number, string> = new Map<number, string>();

  chart: any = null;

  chartType: string = 'column';

  ngxColumns: any[] = [
    { name: 'id', prop: 'id' },
    { name: 'Country', prop: 'name' },
    { name: 'Flight Count', prop: 'flights' },
  ];

  constructor(private dds: DrillDownService) {
    Drilldown(Highcharts);
    Exporting(Highcharts);
    Treemap(Highcharts);
    Heatmap(Highcharts);
  }

  ngOnInit(): void {
    this.fetch();
  }

  onTreeAction({ row }: { row: IApexTreeRow }, dataFetchedAlready = false): void {

    const existingRows = this.hasDataForRow(row);

    if (!dataFetchedAlready && (!existingRows.length)) {
      this.handleFetchTreeData(row);

      return;
    }

    switch (row.treeStatus) {
      case 'disabled': // do nothing
        return;
      break;

      case 'expanded': // the tree node is open, close it.
        row.treeStatus = 'collapsed';
      break;

      default: // we're opening the tree
        row.treeStatus = 'expanded';
      break;
    }

    this.ngxRows = [...this.ngxRows];
  }

  private async fetch(level = 0, path?: string, parentId?: string, chartPoint?: any): Promise<void> {
    this.loading = true;

    const response = await firstValueFrom(this.dds.get(path, parentId));

    this.depthMap.set(level, response.child);

    this.ngxRows = [...this.ngxRows, ...response.data];

    this.loading = false;

    this.update(response.data, chartPoint);
  }

  update(newRows: IApexTreeRow[], chartPoint?: any): void {
    if(!this.chart) {
      this.createChart();
    }

    if (!chartPoint) {
      return;
    }

    // dynamically applies a series, its gone after drill up so we have to re-provide it.
    this.chart.addSingleSeriesAsDrilldown(
      chartPoint,
      (this.chartType === 'treemap') ? this.treeMapSeries(newRows) : this.yChartSeries(newRows),
    );

    this.chart.applyDrilldown();

  }

  updateCt() {
    this.ngxRows = [];
    this.chart = null;

    this.fetch();
  }


  handleFetchTreeData(row: IApexTreeRow, chartPoint?: any): void {
    // has no data or children
    // @ts-ignore
    if (!row.flights || !this.depthMap.get(row.level)) {
      return;
    }

    const existingRows = this.hasDataForRow(row);

    // if there's data already, no need to re-fetch.
    if (existingRows.length) {
      this.ngxRows = [...this.ngxRows];

      this.update(existingRows, chartPoint);

      if (row.treeStatus !== 'expanded') {
        this.onTreeAction({ row }, true);
      }

      return;
    }

    // @ts-ignore
    this.fetch(row.level + 1, this.depthMap.get(row.level), row.id, chartPoint);

    if (row.treeStatus !== 'expanded') {
      this.onTreeAction({ row }, true);
    }
  }


  private createChart(): void {
    // if no chartpoint provided, theres no chart, make the chart.
    const chart : any = {
      ...drillDownChart,
      colorAxis: {
        minColor: '#deedfa',
        // @ts-ignore
        maxColor: Highcharts.getOptions().colors[0],
      },
      series: [
        (this.chartType === 'treemap') ? this.treeMapSeries(this.ngxRows) : this.yChartSeries(this.ngxRows),
      ],
      chart: {
        type: this.chartType,
        events: {
          drilldown: (e: any) => {
            const row = e.point.rowData;

            this.handleFetchTreeData(row, e.point);
          },
        }
      },
    };

    this.chart = Highcharts.chart('chart', chart);
  }

  private hasDataForRow(row: IApexTreeRow): IApexTreeRow[] {
    return this.ngxRows.filter(r => r.parentId === row.id);
  }

  private yChartSeries(rows: IApexTreeRow[]): any[] {
    return {
      name: 'Flights',
      data: rows.map((row) => ({
        name: row.name,
        y: row.flights,
        drilldown: row.id,
        rowData: row,
      })),
    } as any;
  }

  private treeMapSeries(rows: IApexTreeRow[]): any[] {
    return {
      name: 'Flights',
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      data: rows.map((row) => ({
        name: row.name,
        colorValue: row.flights,
        value: row.flights,
        drilldown: row.id,
        rowData: row,
      })),
    } as any;
  }

}
