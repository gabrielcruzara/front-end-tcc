import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IBaseModel } from '@app/@models/base/base.model';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LookupModalComponent } from '../lookup-modal/lookup-modal.component';

@Component({
  selector: 'app-base-form',
  template: ``,
})
export class BaseFormComponent implements OnInit {
  public id: string;
  public novoRegistro = true;
  public titulo: string;

  constructor(
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    public router: Router,
    public localeService: BsLocaleService,
    public matDialog: MatDialog
  ) {
    this.localeService.use('pt-br');

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.novoRegistro = false;
    }
  }

  ngOnInit(): void {}

  public montarMensagensValidacao(model: IBaseModel<any>) {
    let validacaoTexto: string;

    if (model.resultadoValidacao) {
      validacaoTexto = '';
      for (const val of model.resultadoValidacao) {
        validacaoTexto += `${validacaoTexto.length > 0 ? '<br>' : ''} • ${val.errorMessage}`;
      }
    }

    return validacaoTexto;
  }

  public exibirModal(titulo: string, dados: any, exibirId = true): MatDialogRef<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '650px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = { titulo, dados, exibirId };
    return this.matDialog.open(LookupModalComponent, dialogConfig);
  }
}
