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
import { DtDrillDownCoupledComponent } from './views/dt-drill-down-coupled/dt-drill-down-coupled.component';
import { DtDrillDownCoupledIiComponent } from './views/dt-drill-down-coupled-ii/dt-drill-down-coupled-ii.component';
import { CrosstabComponent } from "./views/crosstab/crosstab.component";
import { QueryBuilderComponent } from './views/query-builder/query-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    GridsterComponent,
    DataTableComponent,
    DataTableProComponent,
    DtDrillDownComponent,
    DtDrillDownCoupledComponent,
    DtDrillDownCoupledIiComponent,
    CrosstabComponent,
    QueryBuilderComponent,
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
