import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CadastroServicosService } from '../shared/cadastro-servicos.service';
import { IExeucaoServico, IListaServicos } from '../shared/models/cadastro-servicos.model';

@Component({
  selector: 'app-execucao',
  templateUrl: './execucao.component.html',
  styleUrls: ['./execucao.component.scss']
})
export class ExecucaoComponent implements OnInit {
  servicos: IListaServicos[];
  iniciaForm: FormGroup;

  public deveExibir = true;
  public semDados = true;
  public selectedModel: any = null;
  public dataSource = new MatTableDataSource<IExeucaoServico>([]);

  public displayedColumns: string[] = ['nomeServico', 'custoServico', 'quantidade', 'valorCobrado', 'horaInicio', 'observacao', 'idHistoricoServico', ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private servicoService: CadastroServicosService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.criarForm();
    this.buscarServicos();
    this.carregarServicos();
  }

  iniciarServico(): void {
    this.servicoService
    .iniciaServico(parseInt(this.iniciaForm.value.inicia))
    .then((res) => {
      if(res.sucesso){
        Swal.fire({
          title: 'Atenção!',
          text: res.resultadoValidacao[0].errorMessage,
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        this.carregarServicos();
      }
    })
  }

  carregarServicos() {
    this.spinner.show('servicos');
    this.servicoService
      .servicosExecucao()
      .then((res) => {
        this.dataSource = new MatTableDataSource<IExeucaoServico>(res.dados);
        console.log(res.dados);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.semDados = this.dataSource.filteredData.length === 0;
        this.deveExibir = true;
      })
      .finally(() => this.spinner.hide('servicos'));
  }

  selecionar(item: any) {
    this.selectedModel = !this.selectedModel || this.selectedModel !== item ? item : null; // grid
    console.log(this.selectedModel);
  }

  buscarServicos() {
    this.servicoService
      .buscarServicos()
      .then((res) => {
        this.servicos = res.dados;
        console.log(res.dados);
    });
  }

  private criarForm() {
    this.iniciaForm = this.formBuilder.group({
      inicia: [null, Validators.required],
    });
  }
}
