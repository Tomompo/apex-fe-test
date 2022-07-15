import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList, ViewChildren,
} from '@angular/core';
import { SelectionType } from "@swimlane/ngx-datatable";
import {IApexFareRow, IApexRow, IColumnDef} from 'src/app/interfaces/chart';
import { personColumns } from "../../consts/data-table";
import { ChartService } from "../../services/chart.service";

import * as Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import Treemap from "highcharts/modules/treemap";
import Heatmap from "highcharts/modules/heatmap";
import {fares, faresColumns} from "../../consts/fares";
// @ts-ignore
import dateFormat from "dateformat";

@Component({
  selector: 'app-data-table-pro',
  templateUrl: './data-table-pro.component.html',
  styleUrls: ['./data-table-pro.component.scss']
})
export class DataTableProComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChildren('edit') edit: QueryList<ElementRef<HTMLInputElement>>;

  @HostListener('keydown.shift.tab', ['$event']) shiftTabHandler = (event: Event) =>
    this.handleTabPress(event, 'backwards');

  @HostListener('keydown.tab', ['$event']) tabHandler = (event: Event) =>
    this.handleTabPress(event);

  ngxFilter: IApexRow[] = [];

  ngxRows: any[] = [];
  ngxColumns: IColumnDef[] = [];

  // columns selected by the user, all by default
  ngxSelectedCols: IColumnDef[] = [];
  ngxSelected: IApexRow[] = [];

  fetching: boolean = false;
  page: number = 0;
  chartType: string = 'column';
  stacking: boolean = true;
  SelectionType = SelectionType;
  editingRow: string = '';
  dataset = 'people';

  heatmapHigh: string | undefined = undefined;
  heatmapLow: string | undefined = undefined;

  constructor(
    private chartService: ChartService,
    private cd: ChangeDetectorRef,
  ) {
    Exporting(Highcharts);
    Treemap(Highcharts);
    Heatmap(Highcharts);
  }

  ngOnInit(): void {

    this.start();

  }

  start() : void {
    if (this.dataset === 'people') {

      this.ngxColumns = faresColumns;

      this.fetch();

    } else {

      this.ngxColumns = faresColumns;

      this.ngxRows = fares;

      this.ngxRows = this.ngxRows.map(row => ({
        ...row,
        // @ts-ignore
        Date: dateFormat(row.Date, 'mmm yy'),
        // @ts-ignore
        SixMonthsFare: Number((row.SixMonthsFare || 0).toFixed(2)),
        ThreeMonthsFare: Number((row.ThreeMonthsFare || 0).toFixed(2)),
        OneMonthFare: Number((row.OneMonthFare || 0).toFixed(2)),
        OneWeekFare: Number((row.OneWeekFare || 0).toFixed(2)),
        WeightedAverage: Number((row.OneWeekFare || 0).toFixed(2)),
      }));

      this.update();

    }
    this.ngxSelectedCols = [...this.ngxColumns];
  }

  ngAfterViewInit(): void {
    this.edit.changes.subscribe(() => {
      this.edit.first?.nativeElement?.focus();
    });
  }

  fetch(event = { offset: 0 }): any {
    this.fetching = true;
    this.page = event.offset || 0;

      this.ngxColumns = personColumns;

      this.chartService.getData(this.page).subscribe((output: IApexRow[]) => {
        this.fetching = false;
        this.ngxRows = output;
        this.ngxFilter = output;

        this.update();
      });
  }


  update(): void {
    const rows: IApexRow[] = this.ngxSelected.length ? this.ngxSelected: this.ngxRows;

    const { categories, series, config } = ChartService.genSeriesByType(this.ngxColumns, rows, this.chartType, {
      heatmapHigh: this.heatmapHigh,
      heatmapLow: this.heatmapLow,
    });

    // @ts-ignore
    Highcharts.chart('chart', {
      ...config,
      chart: {
        type: this.chartType,
      },
      title: {
        text: 'People Data'
      },
      xAxis: {
        categories,
      },
      yAxis: {
        title: {
          text: 'Data'
        }
      },
      plotOptions: {
        column: {
          stacking: this.stacking ? 'normal' : null,
        },
        series: {
          stacking: this.stacking ? 'normal' : null,
        }
      },
      series,
    });
  }

  onSelect({ selected }: { selected: IApexRow[] }): void {
    // stops datatable errors on CTRL+A
    if (this.editingRow.length) {
      return;
    }

    this.ngxSelected = selected;

    this.update();
  }

  // filter columns
  filter(filter: string): void {
    this.ngxRows = this.ngxFilter.filter((row) => row.name.toLowerCase().includes(filter));
  }

  // hide/show columns
  colChange({ currentTarget }: Event, col: IColumnDef, index: number): void {
    const checkbox = currentTarget as HTMLInputElement;

    if (checkbox.checked) {
      this.ngxColumns.splice(index, 0, this.ngxSelectedCols[index]);
    } else {
      this.ngxColumns.splice(this.ngxColumns.indexOf(col), 1);
    }

    this.ngxColumns = [...this.ngxColumns];

    this.update();
  }

  save(column: IColumnDef, index: number, value: string): void {
      // crazy but required... if we're on the same column, we must have focused out.
      // so we can set it to editing no column. BUT ONLY if the column is still on screen.
      // otherwise it'll error
      if (this.editingRow === `${index}-${column.prop}`) {
        setTimeout(() => {
          if (this.edit.first) {
            this.editingRow = '';
            this.cd.detectChanges();
          }
        });
      }

      // @ts-ignore
      const ogValue = String(this.ngxRows[index][column.prop]);

      // if the value hasn't changed, don't save anything
      if (ogValue === value) {
        return;
      }

      // @ts-ignore
      this.ngxRows[index][column.prop] = ChartService.typeCast(column, value);

      this.ngxRows = [...this.ngxRows];

      this.update();
  }

  keydown($event: KeyboardEvent, column: IColumnDef, index: number, value: string): void {
    return ['Escape', 'Enter'].includes($event.key) ? this.save(column, index, value) : undefined;
  }

  editRow(index: number, col: string): void {
      this.editingRow = `${index}-${col}`;

      this.cd.detectChanges();
  }

  // tab through columns and rows
  private handleTabPress(event: Event, direction = 'forwards'): void {

    if (!this.editingRow.length) {
      return;
    }

    event.preventDefault();

    let [indexAsString, columnPropName] = this.editingRow.split('-');

    const column = this.ngxColumns.find((col) => col.prop === columnPropName);
    const index = Number(indexAsString);

    if (!column) {
      return;
    }

    const currentColIndex = this.ngxColumns.findIndex((c) => c.prop === column.prop);

    const nextOrPrevIndex = (direction === 'forwards') ? currentColIndex + 1 : currentColIndex - 1

    let prevOrNextColumn = this.ngxColumns[nextOrPrevIndex]?.prop;
    let rowIndex = index;

    if (!prevOrNextColumn) {
      prevOrNextColumn = (direction === 'forwards') ? this.ngxColumns[0].prop : this.ngxColumns[this.ngxColumns.length - 1].prop;
      (direction === 'forwards') ? rowIndex++ : rowIndex--;
    }

    // @ts-ignore
    if (!this.ngxRows[rowIndex] || [null, undefined].includes(this.ngxRows[rowIndex][prevOrNextColumn])) {
      return;
    }

    this.editRow(rowIndex, prevOrNextColumn);
  }

}
