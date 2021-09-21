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
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  abrirModalAlterarSenha() {
    const initialState = {
      login: this.loginForm.controls.login.value,
      primeiraSenha: true,
    };
    this.bsModalRef = this.modalService.show(AlterarSenhaComponent, { initialState });
    this.loginForm.reset();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .then((res) => {
        console.log(res);

        if (res.sucesso) {
          if (res.mensagem.codigo === 3) {
            this.abrirModalAlterarSenha();
            return;
          }

          this.credentialsService.setCredentials(res.dados);
          //this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          window.location.replace(this.route.snapshot.queryParams.redirect || '/');
        } else {
          Swal.fire('', res.mensagem.descricao, 'error');
        }
      })
      .catch((err) => this.toastr.error('Ocorreu um erro tente novamente mais tarde.', 'Atenção'))
      .finally(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
      // remember: true,
    });
  }
}
