import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { DashboardComponent } from './ganho-despesa/dashboard.component';
import { MensalComponent } from './mensal/mensal.component';

const routes: Routes = [
  { path: 'ganhos-custos', component: DashboardComponent, data: { title: marker('Ganhos e Custos') } },
  { path: 'mensal', component: MensalComponent, data: { title: marker('Lucro Mensal') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
