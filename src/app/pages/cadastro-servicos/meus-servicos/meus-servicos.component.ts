import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CadastroServicosService } from '../shared/cadastro-servicos.service';
import { IListaServicos } from '../shared/models/cadastro-servicos.model';
import { EditarServicoComponent } from './editar-servico/editar-servico.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meus-servicos',
  templateUrl: './meus-servicos.component.html',
  styleUrls: ['./meus-servicos.component.scss']
})
export class MeusServicosComponent implements OnInit {
  identificadorServico: number;

  public deveExibir = false;
  public semDados = true;
  public selectedModel: any = null;
  public dataSource = new MatTableDataSource<IListaServicos>([]);

  public displayedColumns: string[] = ['nomeServico', 'custoServico', 'valorCobrado', 'identificadorServico'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private servicoService: CadastroServicosService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.buscarServicos();
  }

  buscarServicos() {
    this.spinner.show('servicos');
    this.servicoService
      .buscarServicos()
      .then((res) => {
        this.dataSource = new MatTableDataSource<IListaServicos>(res.dados);
        console.log(res.dados);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.semDados = this.dataSource.filteredData.length === 0;
        this.deveExibir = true;
      })
      .finally(() => this.spinner.hide('servicos'));
  }

  excluirServico(): void {
    Swal.fire({
      title: 'ATENÇÃO!',
      html: `
      Deseja excluir o serviço selecionado?  
      `,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicoService
        .excluirServico(this.identificadorServico)
        .then((res) => {
            if(res.sucesso){
              Swal.fire({
                title: 'Atenção!',
                text: res.resultadoValidacao[0].errorMessage,
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
              });
              this.buscarServicos();
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
    })
  }

  selecionar(item: any) {
    this.selectedModel = !this.selectedModel || this.selectedModel !== item ? item : null; // grid
    console.log(this.selectedModel);
    this.identificadorServico = this.selectedModel.identificadorServico;
  }

  abrirEditarServico(): void {
    const modalRef = this.modalService.open(EditarServicoComponent, { size: 'lg' });
    modalRef.componentInstance.identificadorServico = this.selectedModel.identificadorServico;
    modalRef.componentInstance.nomeServico = this.selectedModel.nomeServico;
    modalRef.componentInstance.custoServico = this.selectedModel.custoServico;
    modalRef.componentInstance.valorCobrado = this.selectedModel.valorCobrado;

    modalRef.result.then(() => {
      this.buscarServicos();
    });
  }

}
