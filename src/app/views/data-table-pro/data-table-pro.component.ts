import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList, ViewChildren,
} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, take} from "rxjs";
import * as Highcharts from "highcharts";
import { SelectionType } from "@swimlane/ngx-datatable";
import { IApexRow, IColumnDef, InputType, IPerson } from 'src/app/interfaces/chart';
import { personColumns } from "../../consts/data-table";

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

  ngxRows: IApexRow[] = [];
  ngxColumns: IColumnDef[] = personColumns;

  // columns selected by the user, all by default
  ngxSelectedCols: IColumnDef[] = [...this.ngxColumns];
  ngxSelected: IApexRow[] = [];

  fetching: boolean = false;
  page: number = 0;
  chartType: string = 'column';
  stacking: boolean = true;
  SelectionType = SelectionType;
  editingRow: string = '';

  constructor(
    private httpClient: HttpClient,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  ngAfterViewInit(): void {
    this.edit.changes.subscribe(() => {
      this.edit.first?.nativeElement?.focus();
    });
  }

  fetch(event = { offset: 0 }): any {
    this.fetching = true;
    this.page = event.offset || 0;

    this.httpClient.get<{ results: IPerson[] }>(`https://randomuser.me/api/?page=${ this.page + 1 }&results=15&seed=abc`)
      .pipe(
        take(1),
        map(({ results }) => results.map((result) => ({
          name: result.name.first,
          email: result.email,
          age: result.dob.age,
          regAge: result.registered.age,
          postcode: Math.floor(result.location.postcode / 1000) || 0,
          houseNo: Math.floor(result.location.street.number / 120) || 0,
        }))),
      ).subscribe((output: IApexRow[]) => {
        this.fetching = false;
        this.ngxRows = output;
        this.ngxFilter = output;

        this.update();
    });
  }


  update(): void {
    const rows: IApexRow[] = this.ngxSelected.length ? this.ngxSelected: this.ngxRows;

    const { categories, series } = this.genSeriesByType(rows);

    // @ts-ignore
    Highcharts.chart('chart', {
      chart: {
        type: this.chartType,
      },
      title: {
        text: 'People'
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

  // would be in its own service(s)
  private genSeriesByType(rows: IApexRow[]): { categories: string[], series: any[] } {

    let categories: string[];
    let series: any[];

    // ignore string columns as they do not work with PIE
    const stringColumns: string[] = this.ngxColumns.flatMap((col) => {
      // @ts-ignore
      if (typeof rows[0][col.prop] === 'string') {
        return [col.prop];
      }
      return [];
    });

    switch (this.chartType) {
      case 'pie':
        // for each of the columns, make a pie series
        series = this.ngxColumns.flatMap((col) => {

          return stringColumns.includes(col.prop) ? [] : {
            name: col.name,
            data: rows.map((row: any) => ({
              name: row[stringColumns[0]],
              y: row[col.prop],
            })),
          };
        });

        return { categories: [], series };
      break;

      default:
        // @ts-ignore
        categories = rows.map((row) => row[stringColumns[0]]);

        // for each of the columns, make a series, and provide all rows data for this column
        series = this.ngxColumns.flatMap((col) => {

          return stringColumns.includes(col.prop) ? [] : {
            name: col.name,
            data: rows.map((row: any) => row[col.prop]),
          };

        });

        return { categories, series };
      break;
    }
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
      this.ngxRows[index][column.prop] = this.typeCast(column, value);

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

  // highcharts cannot handle strings for numbers etc, the types need to be cast correctly for the cell.
  private typeCast(column: IColumnDef, value: string): string | number {
    switch (column.type) {
      case InputType.number:
        return Number(value);
      break;
      default:
        return value;
      break;
    }
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
