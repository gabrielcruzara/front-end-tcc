import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '..';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss'],
})
export class RegistrarUsuarioComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    public authService: AuthenticationService,
    public formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  cadastrar(): void{
    this.authService.cadastaUsuario(this.registroForm.value.email, this.registroForm.value.nome, this.registroForm.value.senha)  .then((res) => {
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

  criarFormulario() {
    this.registroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }
}
