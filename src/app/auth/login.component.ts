import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';
import { CredentialsService } from './credentials.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

const log = new Logger('Login');
import Swal from 'sweetalert2';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { ToastrService } from 'ngx-toastr';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;

  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.authenticationService
      .login(this.loginForm.value)
      .then((res) => {
        if (res.sucesso) {
          this.credentialsService.setCredentials(res.dados);
          window.location.replace(this.route.snapshot.queryParams.redirect || '/');
        } else {
          Swal.fire('', res.mensagem.descricao, 'error');
        }
      })
      .catch((err) => this.toastr.error('Ocorreu um erro tente novamente mais tarde.', 'Atenção'))
      .finally(() => {
        this.loginForm.markAsPristine();
      });
  }

  abrirCriarConta() : void {
   this.modalService.open(RegistrarUsuarioComponent, { size: 'lg' });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }
}
