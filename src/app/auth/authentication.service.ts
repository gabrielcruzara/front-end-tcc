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

export interface AlterarSenhaContext {
  cpf: string;
  dataNascimento: string;
  senhaAtual: string;
  novaSenha: string;
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

  cadastaUsuario(email: string, nome: string, senha: string): Promise<IBaseModel<any>> {
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

  /**
   * Altera a senha do usuário.
   * @param context Parametros para alterar a senha
   * @return The user credentials.
   */
  // alterarSenha(context: AlterarSenhaContext): Promise<IBaseModel<any>> {
  //   return this.httpClient
  //     .post<IBaseModel<any>>(`${environment.serverUrl}/autenticacao/alterar-senha`, context)
  //     .toPromise();
  // }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    // this.credentialsService.setCredentials();
    window.location.replace('/');
    return of(true);
  }

  // public async obterPerfilUsuario(): Promise<IBaseModel<IPerfilUsuarioModel>> {
  //   if (this.usuario) {
  //     return Promise.resolve({ sucesso: true, dados: this.usuario } as IBaseModel<IPerfilUsuarioModel>);
  //   } else {
  //     try {
  //       const res = await this.httpClient
  //         .get<IBaseModel<IPerfilUsuarioModel>>(`${this.apiBaseUrl}/usuario/perfil`)
  //         .toPromise();
  //       this.usuario = res.dados;
  //       return res;
  //     } catch (err) {
  //       delete this.usuario;
  //       throw err;
  //     }
  //   }
  // }
  // public obterEstado(): Promise<IBaseModel<IUsuarioEstadoModel>> {
  //   return this.httpClient
  //     .get<IBaseModel<IUsuarioEstadoModel>>(`${this.apiBaseUrl}/usuario/estado`)
  //     .toPromise();
  // }

  // public logout(): void {
  //   window.location.replace('/conta/logout');
  // }

  // public login(): void {
  //   window.location.replace('/conta/login?returnUrl=' + window.location);
  // }

  // public possuiPermissao(permissao: string) {
  //   return this.usuario && this.usuario.permissoes && this.usuario.permissoes.indexOf(permissao) >= 0;
  // }

  // public possuiPerfis(perfis: string[]) {
  //   return this.usuario && this.usuario.perfis && perfis.some((p) => this.usuario.perfis.indexOf(p) >= 0);
  // }
}
