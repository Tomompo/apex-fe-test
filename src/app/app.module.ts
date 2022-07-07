import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridsterComponent } from './views/gridster/gridster.component';
import { GridsterModule } from "angular-gridster2";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DataTableComponent } from './views/data-table/data-table.component';
import { FormsModule } from "@angular/forms";
import { DataTableProComponent } from './views/data-table-pro/data-table-pro.component';
import { HttpClientModule } from "@angular/common/http";
import { ChartService } from "./services/chart.service";
import { DtDrillDownComponent } from './views/dt-drill-down/dt-drill-down.component';
import { DrillDownService } from './services/drill-down-service';

@NgModule({
  declarations: [
    AppComponent,
    GridsterComponent,
    DataTableComponent,
    DataTableProComponent,
    DtDrillDownComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GridsterModule,
        NgxDatatableModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [
    ChartService,
    DrillDownService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
