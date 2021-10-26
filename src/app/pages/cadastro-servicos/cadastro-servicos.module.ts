import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/@shared';
import { CadastroServicosRoutingModule } from './cadastro-servicos-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    CommonModule, CadastroServicosRoutingModule, SharedModule
  ]
})
export class CadastroServicosModule { }
