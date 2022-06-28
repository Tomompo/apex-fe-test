import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ngxColumns, ngxRows} from "../../consts/data-table";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild('myTable') table: any;

  // @ts-ignore
  @ViewChild('edit') edit: ElementRef<HTMLInputElement>;

  ngxRows = ngxRows;
  filterableRows = ngxRows;
  ngxColumns = ngxColumns;

  editing: string = '';
  selected: any;

  constructor() { }

  ngOnInit(): void {
  }

  onDetailToggle(row: any): void {
    this.table.rowDetail.toggleExpandRow(row);
  }

  log(index: any, col: string) {
    this.editing = `${index}-${col}`;

    setTimeout(() => {
      this.edit.nativeElement.focus();
    });
  }

  save(row: any, index: number): void {
    this.ngxRows[index] = row;
    this.editing = '';

    this.ngxRows = [...this.ngxRows];
  }

  kd($event: KeyboardEvent, row: any, index: number): void {
    return ['Escape', 'Enter'].includes($event.key) ? this.save(row, index) : undefined;
  }

  filterRows(value: string): void {
    this.ngxRows = this.filterableRows.filter((row) => row.name.toLowerCase().includes(value));
    this.table.offset = 0;
  }
}
