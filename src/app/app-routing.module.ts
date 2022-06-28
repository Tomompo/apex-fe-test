import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridsterComponent } from "./views/gridster/gridster.component";
import { DataTableComponent } from "./views/data-table/data-table.component";
import { DataTableProComponent } from "./views/data-table-pro/data-table-pro.component";

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
      path: 'data-table-extreme',
      component: DataTableProComponent,
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
