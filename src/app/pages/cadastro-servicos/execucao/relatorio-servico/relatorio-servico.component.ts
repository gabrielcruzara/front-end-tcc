import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroServicosService } from '../../shared/cadastro-servicos.service';

@Component({
  selector: 'app-relatorio-servico',
  templateUrl: './relatorio-servico.component.html',
  styleUrls: ['./relatorio-servico.component.scss']
})
export class RelatorioServicoComponent implements OnInit {
  @Input('nomeServico') nomeServico: string;
  @Input('custoServico') custoServico: number;
  @Input('valorCobrado') valorCobrado: number;
  @Input('quantidade') quantidade: number;

  relatorioForm: FormGroup;
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private servicoService: CadastroServicosService,
  ) { }

  ngOnInit(): void {
    this.criarForm();
  }

  private criarForm() {
    this.relatorioForm = this.formBuilder.group({
      custo: [{value: this.custoServico, disabled: true}, Validators.required],
      nomeServico: [{value: this.nomeServico, disabled: true}, Validators.required],
      valorCobrado: [{value: this.valorCobrado, disabled: true}, Validators.required],
      quantidade: [{value: this.quantidade, disabled: true}, Validators.required],
    });
  }
}
