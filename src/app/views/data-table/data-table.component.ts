import { Component, OnInit } from '@angular/core';
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ngxColumns, ngxRows } from "../../consts/data-table";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  ngxRows = ngxRows;
  ngxColumns = ngxColumns;

  ColumnMode = ColumnMode;

  constructor() { }

  ngOnInit(): void {
  }

}
