import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/@shared';
import { CadastroServicosRoutingModule } from './cadastro-servicos-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MeusServicosComponent } from './meus-servicos/meus-servicos.component';


@NgModule({
  declarations: [
    CadastroComponent,
    MeusServicosComponent
  ],
  imports: [
    CommonModule, CadastroServicosRoutingModule, SharedModule
  ]
})
export class CadastroServicosModule { }
