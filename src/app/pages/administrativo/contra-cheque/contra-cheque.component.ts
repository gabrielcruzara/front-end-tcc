import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { AdministrativoService } from '../shared/administrativo.service';
import { IMatricula } from '../shared/models/administrativo.model';
import moment from 'moment';
import { environment } from '@env/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contra-cheque',
  templateUrl: './contra-cheque.component.html',
  styleUrls: ['./contra-cheque.component.scss'],
})
export class ContraChequeComponent implements OnInit {
  contraChequeForm!: FormGroup;
  matriculas: IMatricula[];

  meses = [
    { mes: 'Janeiro', valor: 1 },
    { mes: 'Fevereiro', valor: 2 },
    { mes: 'Março', valor: 3 },
    { mes: 'Abril', valor: 4 },
    { mes: 'Maio', valor: 5 },
    { mes: 'Junho', valor: 6 },
    { mes: 'Julho', valor: 7 },
    { mes: 'Agosto', valor: 8 },
    { mes: 'Setembro', valor: 9 },
    { mes: 'Outubro', valor: 10 },
    { mes: 'Novembro', valor: 11 },
    { mes: 'Dezembro', valor: 12 },
  ];

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

  selecionarParcela(parcela): void {
    if (parcela == 0) {
      this.contraChequeForm.patchValue({
        mes: moment().month() == 0 ? 12 : moment().month(),
        ano: moment().month() == 0 ? moment().year() - 1 : moment().year(),
      });
    } else if (parcela == 3) {
      this.contraChequeForm.patchValue({
        mes: 6,
        ano: moment().month() == 5 ? moment().year() : moment().year() - 1,
      });
    } else if (parcela == 4) {
      this.contraChequeForm.patchValue({
        mes: 12,
        ano: moment().month() == 0 ? moment().year() - 1 : moment().year(),
      });
    }
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
    this.contraChequeForm = this.formBuilder.group({
      matricula: ['', Validators.required],
      tipo: ['0', Validators.required],
      mes: [moment().month() + 1, Validators.required],
      ano: [moment().year(), Validators.required],
    });
  }
}
