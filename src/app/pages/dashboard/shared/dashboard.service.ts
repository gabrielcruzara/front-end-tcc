import { Injectable } from '@angular/core';
import { BaseResourceService } from '@app/@shared/services/base-resource.service';
import { CredentialsService } from '@app/auth';
import { HttpClient } from '@angular/common/http';
import { IBaseModel } from '@app/@models/base/base.model';
import { environment } from '@env/environment';
import { IMeses } from './models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseResourceService {

  constructor(public httpClient: HttpClient, private credentialsService: CredentialsService) { 
    super();
  }
  
  ganhosDespesas(): Promise<IBaseModel<IMeses[]>> {
    return this.httpClient
    .get<IBaseModel<IMeses[]>>(`${environment.serverUrl}/Servico/lista-ganhos-despesas`, {
      headers: this.setHeader(this.credentialsService.credentials.token.accessToken),
    })
    .toPromise();
  }

  buscaGanhoMensal(): Promise<IBaseModel<IMeses[]>> {
    return this.httpClient
    .get<IBaseModel<IMeses[]>>(`${environment.serverUrl}/Servico/busca-lucro-mensal`, {
      headers: this.setHeader(this.credentialsService.credentials.token.accessToken),
    })
    .toPromise();
  }
}