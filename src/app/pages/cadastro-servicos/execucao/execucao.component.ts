import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JoyrideService } from 'ngx-joyride';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CadastroServicosService } from '../shared/cadastro-servicos.service';
import { IExeucaoServico, IListaServicos } from '../shared/models/cadastro-servicos.model';
import { ConcluirServicoComponent } from './concluir-servico/concluir-servico.component';
import { RelatorioServicoComponent } from './relatorio-servico/relatorio-servico.component';

@Component({
  selector: 'app-execucao',
  templateUrl: './execucao.component.html',
  styleUrls: ['./execucao.component.scss']
})
export class ExecucaoComponent implements OnInit {
  servicos: IListaServicos[];
  iniciaForm: FormGroup;

  idHistoricoServico: number;

  public deveExibir = true;
  public semDados = true;
  public selectedModel: any = null;
  public dataSource = new MatTableDataSource<IExeucaoServico>([]);

  public displayedColumns: string[] = ['nomeServico', 'custoServico', 'quantidade', 'valorCobrado', 'horaInicio', 'observacao', 'idHistoricoServico', ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  tour(){
    this.joyride.startTour({ 
      steps: ['selecionar', 'iniciar', 'selecionarServico', 'adicionar', 'diminuir', 'relatorio', 'concluir', 'excluir'],
      themeColor: '#99ccff',
      stepDefaultPosition: 'top',
      customTexts: {
        next: '>>',
        prev: '<<',
        done: 'Ok'
      }
    });    
  }

  constructor(
    private servicoService: CadastroServicosService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private joyride: JoyrideService
  ) { }

  ngOnInit(): void {
    this.criarForm();
    this.buscarServicos();
    this.carregarServicos();
  }

  adicionarServico(): void {
    this.servicoService
    .adicionarServico(this.idHistoricoServico)
    .then((res) => {
      if(res.sucesso){
        this.carregarServicos();
      }
    });
  }

  diminuirServico(): void {
    this.servicoService
    .diminuirServico(this.idHistoricoServico)
    .then((res) => {
      if(res.sucesso){
        this.carregarServicos();
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

  excluirServicoExecucao(): void {
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
        .excluirServicoExecucao(this.idHistoricoServico)
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
    this.selectedModel = !this.selectedModel || this.selectedModel !== item ? item : null;
    this.idHistoricoServico = this.selectedModel.idHistoricoServico
  }

  buscarServicos() {
    this.servicoService
      .buscarServicos()
      .then((res) => {
        this.servicos = res.dados;
    });
  }

  abrirConcluirServico(): void {
    const modalRef = this.modalService.open(ConcluirServicoComponent, { size: 'lg' });
    modalRef.componentInstance.nomeServico = this.selectedModel.nomeServico;
    modalRef.componentInstance.custoServico = this.selectedModel.custoServico;
    modalRef.componentInstance.valorCobrado = this.selectedModel.valorCobrado;
    modalRef.componentInstance.quantidade = this.selectedModel.quantidade;
    modalRef.componentInstance.idHistoricoServico = this.selectedModel.idHistoricoServico;

    modalRef.result.then(() => {
      this.carregarServicos();
    });
  }

  abrirRelatorioServico(): void {
    const modalRef = this.modalService.open(RelatorioServicoComponent, { size: 'lg' });
    modalRef.componentInstance.nomeServico = this.selectedModel.nomeServico;
    modalRef.componentInstance.custoServico = this.selectedModel.custoServico;
    modalRef.componentInstance.valorCobrado = this.selectedModel.valorCobrado;
    modalRef.componentInstance.quantidade = this.selectedModel.quantidade;    
  }

  private criarForm() {
    this.iniciaForm = this.formBuilder.group({
      inicia: ['', Validators.required],
    });
  }
}
