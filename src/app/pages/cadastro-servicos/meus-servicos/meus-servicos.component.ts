import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CadastroServicosService } from '../shared/cadastro-servicos.service';
import { IListaServicos } from '../shared/models/cadastro-servicos.model';

@Component({
  selector: 'app-meus-servicos',
  templateUrl: './meus-servicos.component.html',
  styleUrls: ['./meus-servicos.component.scss']
})
export class MeusServicosComponent implements OnInit {
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

  selecionar(item: any) {
    this.selectedModel = !this.selectedModel || this.selectedModel !== item ? item : null; // grid
    console.log(this.selectedModel);
  }


}
