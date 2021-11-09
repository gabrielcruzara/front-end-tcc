import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseModel } from '@app/@models/base/base.model';
import { BaseResourceService } from '@app/@shared/services/base-resource.service';
import { CredentialsService } from '@app/auth';
import { environment } from '@env/environment';
import { IListaServicos } from './models/cadastro-servicos.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroServicosService extends BaseResourceService {
  constructor(public httpClient: HttpClient, private credentialsService: CredentialsService) { 
    super();
  }

  buscarServicos(): Promise<IBaseModel<IListaServicos[]>> {
    return this.httpClient
    .get<IBaseModel<IListaServicos[]>>(`${environment.serverUrl}/Servico/buscar-servicos`, {
      headers: this.setHeader(this.credentialsService.credentials.token.accessToken),
    })
    .toPromise();
  }

  cadastrarServicos(nomeServico: string, custoServico: number, valorCobrado: number): Promise<IBaseModel<any>>{
      return this.httpClient
      .post<IBaseModel<any>>(
        `${environment.serverUrl}/Servico/cadastrar-servicos`,
        {
          nomeServico: nomeServico,
          custoServico: custoServico,
          valorCobrado: valorCobrado
        },
        { 
          headers: this.setHeader(this.credentialsService.credentials.token.accessToken),
        }
      )
      .toPromise();
    }
}
