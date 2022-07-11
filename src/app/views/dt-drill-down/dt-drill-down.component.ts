import {Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import Drilldown from "highcharts/modules/drilldown";
import Exporting from "highcharts/modules/exporting";
import { DrillDownService } from "../../services/drill-down-service";
import { firstValueFrom } from "rxjs";
import { IApexTreeRow } from "../../interfaces/chart";
import { drillDownChart } from "../../consts/drill-down";


@Component({
  selector: 'app-dt-drill-down',
  templateUrl: './dt-drill-down.component.html',
  styleUrls: ['./dt-drill-down.component.scss']
})
export class DtDrillDownComponent implements OnInit {

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
  }

  ngOnInit(): void {
    this.fetch();
  }

  onTreeAction({ row }: { row: IApexTreeRow }): void {

    // do nothing if the status is disabled.
    if (row.treeStatus === 'disabled') {
      return;
    }

    // close if open already
    if (row.treeStatus === 'expanded') {
      row.treeStatus = 'collapsed';

      this.ngxRows = [...this.ngxRows];

      return;
    }

    // we're opening the tree
    row.treeStatus = 'expanded';

    const existingRows = this.ngxRows.filter(r => r.parentId === row.id);

    // if there's data already, no need to re-fetch.
    if (existingRows.length) {
      this.ngxRows = [...this.ngxRows];

      return;
    }

    const lv = row.level || 0;

    // else theres no data, fetch the next level of data.
    this.fetch(lv + 1, this.depthMap.get(lv), row.id, null, false);
  }

  private async fetch(level = 0, path?: string, parentId?: string, chartPoint?: any, drawChart = true): Promise<void> {
    this.loading = true;

    const response = await firstValueFrom(this.dds.get(path, parentId));

    this.depthMap.set(level, response.child);

    this.ngxRows = [...this.ngxRows, ...response.data];

    this.loading = false;

    if (drawChart) {
      this.update(response.data, chartPoint);
    }
  }

  update(newRows: IApexTreeRow[], chartPoint?: any): void {

    if (chartPoint) {

      // dynamically applies a series, its gone after drill up so we have to re-provide it.
      this.chart.addSingleSeriesAsDrilldown(chartPoint, {
        name: 'Flights',
        data: newRows.map((r) => ({
          name: r.name,
          y: r.flights,
          drilldown: r.id,
          rowData: r,
        }))
      });

      this.chart.applyDrilldown();

      return;

    }

    // if no chartpoint provided, theres no chart, make the chart.
    const chart : any = {
      ...drillDownChart,
      series: [
        {
          name: 'Flights',
          data: this.ngxRows
            .filter((row) => !row.parentId)
            .map((row) => ({
              name: row.name,
              y: row.flights,
              drilldown: row.id,
              rowData: row,
            })),
        }
      ],
      chart: {
        type: this.chartType,
        events: {
          drilldown: (e: any) => {

            const row = e.point.rowData;

            // has no data or children
            if (!row.flights || !this.depthMap.get(row.level)) {
              return;
            }

            const existingRows = this.ngxRows.filter(r => r.parentId === row.id);

            // if there's data already, no need to re-fetch.
            if (existingRows.length) {
              this.ngxRows = [...this.ngxRows];

              this.update(existingRows, e.point);

              return;
            }

            this.fetch(row.level + 1, this.depthMap.get(row.level), row.id, e.point);

          },
        }
      },
    };

    this.chart = Highcharts.chart('chart', chart);

  }

  updateCt() {
    this.ngxRows = [];

    this.fetch();
  }

}
