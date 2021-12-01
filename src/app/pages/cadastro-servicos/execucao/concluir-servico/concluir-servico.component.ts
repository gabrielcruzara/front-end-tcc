import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CadastroServicosService } from '../../shared/cadastro-servicos.service';

@Component({
  selector: 'app-concluir-servico',
  templateUrl: './concluir-servico.component.html',
  styleUrls: ['./concluir-servico.component.scss']
})
export class ConcluirServicoComponent implements OnInit {
  @Input('nomeServico') nomeServico: string;
  @Input('custoServico') custoServico: number;
  @Input('valorCobrado') valorCobrado: number;
  @Input('quantidade') quantidade: number;
  @Input('idHistoricoServico') idHistoricoServico: number;
  
  concluirForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private servicoService: CadastroServicosService,
  ) { }

  ngOnInit(): void {
    this.criarForm();
  }

  concluirServico(): void {
    this.servicoService
    .concluirServico(this.idHistoricoServico, this.concluirForm.value.observacao, this.quantidade)
    .then((res) => {
      if(res.sucesso){
        Swal.fire({
          title: 'Atenção!',
          text: res.resultadoValidacao[0].errorMessage,
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        this.activeModal.close();
      }
      else {
        Swal.fire({
          title: 'Atenção!',
          text: res.resultadoValidacao[0].errorMessage,
          icon: 'error',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    });
  }

  private criarForm() {
    this.concluirForm = this.formBuilder.group({
      custo: [{value: this.custoServico, disabled: true}, Validators.required],
      nomeServico: [{value: this.nomeServico, disabled: true}, Validators.required],
      quantidade: [{value: this.quantidade, disabled: true}, Validators.required],
      valorCobrado: [{value: this.valorCobrado, disabled: true}, Validators.required],
      observacao: [{value: '', disabled: false}, Validators.required],
    });
  }
}
