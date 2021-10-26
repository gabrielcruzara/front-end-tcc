import { TestBed } from '@angular/core/testing';

import { CadastroServicosService } from './cadastro-servicos.service';

describe('CadastroServicosService', () => {
  let service: CadastroServicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroServicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
