import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridsterComponent } from './views/gridster/gridster.component';
import { GridsterModule } from "angular-gridster2";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DataTableComponent } from './views/data-table/data-table.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    GridsterComponent,
    DataTableComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GridsterModule,
        NgxDatatableModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
