import { ContraChequeComponent } from './contra-cheque/contra-cheque.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { CedulaCComponent } from './cedula-c/cedula-c.component';

const routes: Routes = [
  // { path: '', redirectTo: 'cedula-c', pathMatch: 'full' },
  { path: 'cedula-c', component: CedulaCComponent, data: { title: marker('Cédula C') } },
  { path: 'contra-cheque', component: ContraChequeComponent, data: { title: marker('Contra Cheque') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrativoRoutingModule {}
