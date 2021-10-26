import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CadastroServicosService } from '../shared/cadastro-servicos.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servicoService: CadastroServicosService,
  ) { }

  ngOnInit(): void {
    this.criarForm()
  }

  cadastrar(): void {
    this.servicoService.cadastrarServicos(
      this.cadastroForm.value.id, 
      this.cadastroForm.value.nomeServico, 
      this.cadastroForm.value.custo, 
      this.cadastroForm.value.valorCobrado)
    .then((res) => {
      if(res.sucesso){
        Swal.fire({
          title: 'Atenção!',
          text: res.resultadoValidacao[0].errorMessage,
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    })
  }

  private criarForm() {
    this.cadastroForm = this.formBuilder.group({
      id: [6, Validators.required],
      nomeServico: ['', Validators.required],
      custo: [0, Validators.required],
      valorCobrado: [0, Validators.required],
    });
  }

}
