import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CadastroServicosService } from '../cadastro-servicos/shared/cadastro-servicos.service';
import { IServicosConcluidos } from '../cadastro-servicos/shared/models/cadastro-servicos.model';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {

  public deveExibir = true;
  public semDados = true;
  public selectedModel: any = null;
  public dataSource = new MatTableDataSource<IServicosConcluidos>([]);

  public displayedColumns: string[] = ['nomeServico', 'quantidade', 'custoServico', 'valorCobrado', 'horaInicio', 'horaFinal', 'observacao', 'identificadorHistoricoServico', ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private servicoService: CadastroServicosService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.servicosConcluidos();
  }

  servicosConcluidos() {
    this.spinner.show('servicos');
    this.servicoService
      .servicosConcluidos()
      .then((res) => {
        this.dataSource = new MatTableDataSource<IServicosConcluidos>(res.dados);
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
