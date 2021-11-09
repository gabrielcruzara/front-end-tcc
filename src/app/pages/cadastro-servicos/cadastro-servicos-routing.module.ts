import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MeusServicosComponent } from './meus-servicos/meus-servicos.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent, data: { title: marker('Cadastro') } },
  { path: 'meus-servicos', component: MeusServicosComponent, data: { title: marker('Meus Serviços') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroServicosRoutingModule {}