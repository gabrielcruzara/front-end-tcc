import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss'],
})
export class AlterarSenhaComponent implements OnInit {
  @Input('primeira-senha') primeiraSenha: boolean;

  login: string;
  alterarSenhaForm!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  // AlterarSenha() {
  //   this.authenticationService.alterarSenha(this.alterarSenhaForm.value).then((res) => {
  //     // console.log(res);
  //     if (res.mensagem.codigo === 5) {
  //       Swal.fire('Atenção!', res.resultadoValidacao[0].errorMessage, 'error');
  //       return;
  //     }

  //     Swal.fire('Atenção!', res.mensagem.descricao, 'success');
  //     this.bsModalRef.hide();
  //   });
  // }

  private createForm() {
    if (!this.primeiraSenha === true) {
      this.alterarSenhaForm = this.formBuilder.group(
        {
          cpf: ['', Validators.required],
          dataNascimento: ['', Validators.required],
          senhaAtual: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
          novaSenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
          confirmarSenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
          login: [this.login],
        },
        {
          validator: MustMatch('novaSenha', 'confirmarSenha'),
        }
      );
      return;
    } else {
      //console.log('entrou no else');
      this.alterarSenhaForm = this.formBuilder.group(
        {
          cpf: ['', Validators.required],
          dataNascimento: ['', Validators.required],
          senhaAtual: [''],
          novaSenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
          confirmarSenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
          login: [this.login],
        },
        {
          validator: MustMatch('novaSenha', 'confirmarSenha'),
        }
      );
    }
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
