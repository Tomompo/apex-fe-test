import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridsterComponent } from "./views/gridster/gridster.component";
import { DataTableComponent } from "./views/data-table/data-table.component";
import { DataTableProComponent } from "./views/data-table-pro/data-table-pro.component";
import { DtDrillDownComponent } from "./views/dt-drill-down/dt-drill-down.component";
import {DtDrillDownCoupledComponent} from "./views/dt-drill-down-coupled/dt-drill-down-coupled.component";
import {DtDrillDownCoupledIiComponent} from "./views/dt-drill-down-coupled-ii/dt-drill-down-coupled-ii.component";
import {CrosstabComponent} from "./views/crosstab/crosstab.component";

const routes: Routes = [
    {
      path: '',
      redirectTo: 'gridster',
      pathMatch: 'full',
    },
    {
      path: 'gridster',
      component: GridsterComponent,
    },
    {
      path: 'data-table',
      component: DataTableComponent,
    },
    {
      path: 'crosstab',
      component: CrosstabComponent,
    },
    {
      path: 'data-table-extreme',
      component: DataTableProComponent,
    },
    {
      path: 'data-table-drill-down',
      component: DtDrillDownComponent,
    },
    {
      path: 'data-table-drill-down-coupled',
      component: DtDrillDownCoupledComponent,
    },
    {
      path: 'data-table-drill-down-coupled-ii',
      component: DtDrillDownCoupledIiComponent,
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
