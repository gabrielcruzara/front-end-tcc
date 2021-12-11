import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';
import { CredentialsService } from '..';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss'],
})
export class AlterarSenhaComponent implements OnInit {
  login: string;
  alterarSenhaForm!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  AlterarSenha() {
    this.authenticationService.alterarSenha(this.credentialService.credentials.dadosUsuario.email, this.alterarSenhaForm.value.senhaAtual, this.alterarSenhaForm.value.novaSenha).then((res) => {
      if(res.sucesso){
        Swal.fire({
          title: 'Atenção!',
          text: res.resultadoValidacao[0].errorMessage,
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        this.bsModalRef.hide();
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

  private createForm() {
      this.alterarSenhaForm = this.formBuilder.group(
        {
          senhaAtual: [''],
          novaSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
          confirmarSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        },
        {
          validator: MustMatch('novaSenha', 'confirmarSenha'),
        }
      );
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
