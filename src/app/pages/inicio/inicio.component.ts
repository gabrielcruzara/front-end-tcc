import { Component, OnInit } from '@angular/core';
import { CadastroServicosService } from '../cadastro-servicos/shared/cadastro-servicos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  
  constructor(
    private servicoService: CadastroServicosService,
  ) {}

  ngOnInit(): void {}
}
