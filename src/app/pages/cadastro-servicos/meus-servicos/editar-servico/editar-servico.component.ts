import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CadastroServicosService } from '../../shared/cadastro-servicos.service';

@Component({
  selector: 'app-editar-servico',
  templateUrl: './editar-servico.component.html',
  styleUrls: ['./editar-servico.component.scss']
})
export class EditarServicoComponent implements OnInit {
  @Input('identificadorServico') identificadorServico : number;
  @Input('nomeServico') nomeServico : string;
  @Input('custoServico') custoServico : any;
  @Input('valorCobrado') valorCobrado : any;

  editarForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private servicoService: CadastroServicosService,
  ) { }

  ngOnInit(): void {
    this.criarForm();
  }

  editarServico(): void {
    this.servicoService
    .editarServicos(this.identificadorServico, this.editarForm.value.nomeServico, this.editarForm.value.custo, this.editarForm.value.valorCobrado)
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
    this.editarForm = this.formBuilder.group({
      nomeServico: [this.nomeServico, Validators.required],
      custo: [this.custoServico, Validators.required],
      valorCobrado: [this.valorCobrado, Validators.required],
    });
  }
}
