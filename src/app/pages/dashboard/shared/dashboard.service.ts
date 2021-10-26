import { Injectable } from '@angular/core';
import { BaseResourceService } from '@app/@shared/services/base-resource.service';
import { CredentialsService } from '@app/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseResourceService {

  constructor(public httpClient: HttpClient, private credentialsService: CredentialsService) { 
    super();
  }

  anoAtual: number = new Date().getFullYear();
  anoInicial: number = this.anoAtual - 10;
  anos: number[];
}