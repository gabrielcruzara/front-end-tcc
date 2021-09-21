import { environment } from './../../../../environments/environment';
import { IBaseModel } from './../../../@shared/models/base.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICedulaCInput, IMatriculas } from './models/administrativo.model';
import { BaseResourceService } from '@app/@shared/services/base-resource.service';
import { CredentialsService } from '@app/auth';

@Injectable({
  providedIn: 'root',
})
export class AdministrativoService extends BaseResourceService {
  constructor(public httpClient: HttpClient, private credentialsService: CredentialsService) {
    super();
  }
  /**
   * Busca lista de matrículas
   * @param jsonData Usuario
   */
  buscarMatriculas(cpf: string): Promise<IBaseModel<IMatriculas>> {
    return this.httpClient
      .get<IBaseModel<IMatriculas>>(`${environment.serverUrl}/Administrativo/matriculas?cpf=${cpf}`, {
        headers: this.setHeader(this.credentialsService.credentials.token.accessToken),
      })
      .toPromise();
  }
}
