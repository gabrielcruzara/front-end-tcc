import { ToastrService } from 'ngx-toastr';
import { CredentialsService } from './../../../auth/credentials.service';
import { AdministrativoService } from './../shared/administrativo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';
import { IMatricula } from '../shared/models/administrativo.model';
import { environment } from '@env/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cedula-c',
  templateUrl: './cedula-c.component.html',
  styleUrls: ['./cedula-c.component.scss'],
})
export class CedulaCComponent implements OnInit {
  cedulaCForm!: FormGroup;
  matriculas: IMatricula[];

  constructor(
    private formBuilder: FormBuilder,
    private administrativoService: AdministrativoService,
    private credentialService: CredentialsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    //this.buscarMatriculas();
  }

  public get anos(): number[] {
    var anos: number[] = [];
    for (var i = moment().year(); i > 2008; i--) {
      anos.push(i);
    }
    return anos;
  }

  // buscarMatriculas(): void {
  //   let cpf = this.credentialService.credentials.dadosUsuario.cpf;
  //   this.administrativoService
  //     .buscarMatriculas(cpf)
  //     .then((res) => {
  //       this.matriculas = res.dados.matriculas;
  //     })
  //     .catch((err) => this.toastr.error('Ocorreu um erro tente novamente mais tarde.', 'Atenção'));
  // }

  private criarFormulario() {
    this.cedulaCForm = this.formBuilder.group({
      matricula: [1259, Validators.required],
      ano: ['', Validators.required],
    });
  }
}
