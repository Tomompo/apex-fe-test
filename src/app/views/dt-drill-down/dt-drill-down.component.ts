import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from "highcharts";
import Drilldown from "highcharts/modules/drilldown";
import Exporting from "highcharts/modules/exporting";
// import type from "highcharts/modules/treemap";
import { drillDownChart } from "../../consts/drill-down";
import { DrillDownService } from "../../services/drill-down-service";
import { firstValueFrom } from "rxjs";

interface IApexTreeRow {
  name: string;
  flights: number;
  id: number;
  child?: string;
  type?: string;
  level?: number;
  treeStatus: 'collapsed' | 'loading' | 'expanded' | 'disabled';
  parentId: number;
}

@Component({
  selector: 'app-dt-drill-down',
  templateUrl: './dt-drill-down.component.html',
  styleUrls: ['./dt-drill-down.component.scss']
})
export class DtDrillDownComponent implements OnInit {

  loading: boolean = false;

  ngxRows: IApexTreeRow[] = [];

  ngxColumns: any[] = [
    { name: 'id', prop: 'id' },
    { name: 'Country', prop: 'name' },
    { name: 'Flight Count', prop: 'flights' },
  ];

  constructor(private dds: DrillDownService) {
    Drilldown(Highcharts);
    Exporting(Highcharts);
    // type(Highcharts);
  }

  ngOnInit(): void {
    this.fetch();
  }

  private async fetch(path?: string, parent?: number): Promise<void> {
    this.loading = true;

    const rows = await firstValueFrom(this.dds.get(path, parent));

    this.ngxRows = [...this.ngxRows, ...rows];

    this.loading = false;

    this.update();
  }

  onTreeAction({ row }: { row: IApexTreeRow }): void {
    // close if open already
    if (row.treeStatus === 'expanded') {
      row.treeStatus = 'collapsed';

      this.ngxRows = [...this.ngxRows];

      return;
    }

    // we're opening the tree
    row.treeStatus = 'expanded';

    // if there's data already, no need to re-fetch.
    if (!!this.ngxRows.find(r => r.parentId === row.id)) {
      this.ngxRows = [...this.ngxRows];

      return;
    }

    // else theres no data, fetch the data.
    this.fetch(row.child, row.id);
  }


  update(): void {

    setTimeout(() => {

      const dataLevels = new Set(this.ngxRows.map((a) => a.level));
      const dataTypes = new Set(this.ngxRows.map((a) => a.type));

      const lv: Map<string, any[]> = new Map<string, any[]>();

      const obj: any = {
        series: [],
        drilldown: {
          series: [],
        },
      };

      dataLevels.forEach((level) => {

        if (level === 0) {
          // this is top level data, needs to be the series

          const dd: any = {
            id: this.ngxRows.find((row) => row.level === level)?.type || 'test',
            data: [],
          };

          this.ngxRows
            .filter((row) => row.level === level)
            .forEach((row) => dd.data.push({
              name: row.name,
              y: row.flights,
              drilldown: row.child,
            }));

          obj.series.push(dd);

        } else {
          // it's drill down content, put it in the drill down.
          this.ngxRows.filter((row) => row.level === level)
            .forEach((row) => {
              // @ts-ignore
              const arr = lv.get(row.type) || [];

              arr.push(row);

              // @ts-ignore
              lv.set(row.type, arr);

            });

        }

      });

      console.log(lv);

      const chart = {
        ...drillDownChart,
        ...obj,
      };

      // console.log(chart);
      // console.log(drillDownChart);

      Highcharts.chart('chart', chart);

    });



    return;

    // // @ts-ignore
    // Highcharts.chart('chart', {
    //   ...drillDownChart,
    //   ...obj,
    //   chart: {
    //     ...drillDownChart.chart,
    //     events: {
    //       drilldown: (e) => {
    //         // @ts-ignore
    //         const row = this.ngxRows[(e.seriesOptions.chartRow - 1) || 0];
    //
    //         this.onTreeAction({ row });
    //       },
    //       drillup: (e) => {
    //         console.log(e);
    //       },
    //     }
    //   },
    //   // series: this.ngxRows.some(a => a.child);
    // });

  }

}
