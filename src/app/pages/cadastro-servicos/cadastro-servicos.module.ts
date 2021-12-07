import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/@shared';
import { CadastroServicosRoutingModule } from './cadastro-servicos-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MeusServicosComponent } from './meus-servicos/meus-servicos.component';
import { EditarServicoComponent } from './meus-servicos/editar-servico/editar-servico.component';
import { ExecucaoComponent } from './execucao/execucao.component';
import { ConcluirServicoComponent } from './execucao/concluir-servico/concluir-servico.component';
import { RelatorioServicoComponent } from './execucao/relatorio-servico/relatorio-servico.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { JoyrideModule } from 'ngx-joyride';


@NgModule({
  declarations: [
    CadastroComponent,
    MeusServicosComponent,
    EditarServicoComponent,
    ExecucaoComponent,
    ConcluirServicoComponent,
    RelatorioServicoComponent
  ],
  imports: [
    CommonModule, CadastroServicosRoutingModule, SharedModule, NgxCurrencyModule, JoyrideModule.forRoot(),
  ]
})
export class CadastroServicosModule { }
