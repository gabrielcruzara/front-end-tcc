import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lookup-modal',
  templateUrl: './lookup-modal.component.html',
  styleUrls: ['./lookup-modal.component.scss'],
})
export class LookupModalComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>([]);
  public semDados = true;
  public exibirId = true;
  public titulo = '';
  public selecionado: any;
  public displayedColumns: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialogRef: MatDialogRef<LookupModalComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    if (data.exibirId) {
      this.displayedColumns = ['selecao', 'id', 'nome'];
    } else {
      this.displayedColumns = ['selecao', 'nome'];
    }

    this.exibirId = data.exibirId;
    this.titulo = data.titulo;
    this.dataSource = new MatTableDataSource<any>(data.dados);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.semDados = this.dataSource.filteredData.length === 0;
  }

  public filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.semDados = this.dataSource.filteredData.length === 0;
  }

  public selecionarItem(item: any) {
    this.selecionado = !this.selecionado || this.selecionado.id !== item.id ? item : null;
  }

  public concluir() {
    this.dialogRef.close(this.selecionado);
  }

  public cancelar() {
    this.dialogRef.close();
  }
}
