import { Component, OnInit } from '@angular/core';
import { ColumnMode } from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  ngxRows: any[] = [];
  ngxColumns: any[] = [];

  ColumnMode = ColumnMode;

  constructor() { }

  ngOnInit(): void {
    // NGX DT
    this.ngxRows = [
      { name: 'Austin', gender: 'Male', company: 'Swimlane' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' }
    ];

    this.ngxColumns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }, { name: 'bliah' }];
  }

}
