import { IBaseModel } from './../@models/base/base.model';
import { IPerfilUsuarioModel } from './../@models/perfil-usuario.model';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

export interface LoginContext {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public apiBaseUrl = `${window.location.origin}/api`;

  public usuario: IPerfilUsuarioModel;

  constructor(public httpClient: HttpClient) {
  }


  login(context: LoginContext): Promise<IBaseModel<IPerfilUsuarioModel>> {
    return this.httpClient
      .post<IBaseModel<IPerfilUsuarioModel>>(`${environment.serverUrl}/Autenticacao/login`, context)
      .toPromise();
  }

  cadastraUsuario(email: string, nome: string, senha: string): Promise<IBaseModel<any>> {
    return this.httpClient
    .post<IBaseModel<any>>(`${environment.serverUrl}/Autenticacao/cadastrar-usuario`,
    { 
      email: email,
      nome: nome,
      senha: senha
    }
    )
    .toPromise();
  }

  alterarSenha(email: string, senhaAtual: string, novaSenha: string): Promise<IBaseModel<any>> {
    return this.httpClient
      .post<IBaseModel<any>>(`${environment.serverUrl}/Autenticacao/altera-senha`,
      { 
        email: email,
        senhaAtual: senhaAtual,
        novaSenha: novaSenha
      }
      )
      .toPromise();
  }

  logout(): Observable<boolean> {
    window.location.replace('/');
    return of(true);
  }
}
