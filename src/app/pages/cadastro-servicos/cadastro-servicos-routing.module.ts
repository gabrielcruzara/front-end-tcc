import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent, data: { title: marker('Cadastro') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroServicosRoutingModule {}