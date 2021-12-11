import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoyrideService } from 'ngx-joyride';
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
    private joyride: JoyrideService    
  ) { }

  ngOnInit(): void {
    this.criarForm()
  }

  tour(){
    this.joyride.startTour({ 
      steps: ['nome', 'custo', 'valor', 'cadastrar'],
      themeColor: '#99ccff',
      stepDefaultPosition: 'right',
      customTexts: {
        next: '>>',
        prev: '<<',
        done: 'Ok'
      }
    });    
  }

  cadastrar(): void {
    this.servicoService.cadastrarServicos(
      this.cadastroForm.value.nomeServico, 
      parseFloat(this.cadastroForm.value.custo), 
      parseFloat(this.cadastroForm.value.valorCobrado))
    .then((res) => {
      if(res.sucesso){
        Swal.fire({
          title: 'Atenção!',
          text: res.resultadoValidacao[0].errorMessage,
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        
        this.cadastroForm.reset();
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
    })
  }

  private criarForm() {
    this.cadastroForm = this.formBuilder.group({
      nomeServico: [null, Validators.required],
      custo: [null, Validators.required],
      valorCobrado: [null, Validators.required],
    });
  }
}
