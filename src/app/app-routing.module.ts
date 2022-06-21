import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridsterComponent } from "./views/gridster/gridster.component";
import { DataTableComponent } from "./views/data-table/data-table.component";

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
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
