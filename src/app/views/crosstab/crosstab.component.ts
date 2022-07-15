import { Component, OnInit } from '@angular/core';
import {IApexFareRow, IColumnDef} from "../../interfaces/chart";
import {fares, faresColumns} from "../../consts/fares";
import { SelectionType } from '@swimlane/ngx-datatable';
import * as Highcharts from "highcharts";
// @ts-ignore
import dateFormat from "dateformat";

@Component({
  selector: 'app-crosstab',
  templateUrl: './crosstab.component.html',
  styleUrls: ['./crosstab.component.scss']
})
export class CrosstabComponent implements OnInit {

  ngxColumns: IColumnDef[] = faresColumns;

  ngxRows: IApexFareRow[] = fares.map(row => ({
    ...row,
    Date: dateFormat(row.Date, 'mmm yy'),
    SixMonthsFare: Number((row.SixMonthsFare || 0).toFixed(2)),
    ThreeMonthsFare: Number((row.ThreeMonthsFare || 0).toFixed(2)),
    OneMonthFare: Number((row.OneMonthFare || 0).toFixed(2)),
    OneWeekFare: Number((row.OneWeekFare || 0).toFixed(2)),
    WeightedAverage: Number((row.OneWeekFare || 0).toFixed(2)),
  }));


  ngxSelected: IApexFareRow[] = [];

  SelectionType = SelectionType;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect($event: any) {

  }
}
