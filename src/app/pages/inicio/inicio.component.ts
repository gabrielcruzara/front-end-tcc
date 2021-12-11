import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';
import { CadastroServicosService } from '../cadastro-servicos/shared/cadastro-servicos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})

export class InicioComponent implements OnInit {
  meusServicos: string;
  relatorios: string;
  iniciarServico: string;

  constructor(
    private joyride: JoyrideService,
    private servicoService: CadastroServicosService,
  ) {}

  ngOnInit(): void {
    this.buscaTotal();
  }

  buscaTotal(): void {
    this.servicoService.buscaTotal().then((res) => {
        this.meusServicos = res.dados[0].quantidadeServicosCadastrados;
        this.relatorios = res.dados[0].quantidadeServicosConcluidos;
        this.iniciarServico = res.dados[0].quantidadeServicosExecucao
    })
  }

  tour(){
    this.joyride.startTour({ 
      steps: ['passoUm', 'passoDois', 'passoTres', 'passoQuatro'],
      stepDefaultPosition: 'top',
      themeColor: '#99ccff',
      customTexts: {
        next: '>>',
        prev: '<<',
        done: 'Ok'
      }
    });
  }

}
