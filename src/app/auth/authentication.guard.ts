import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@core';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}

/* 
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    public router: Router,
    private toastr: ToastrService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.permiteAcesso(next.data);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.permiteAcesso(next.data);
  }

  private permiteAcesso(routeData: any): Promise<boolean> {
    return this.authService.obterEstado()
      .then(async (res) => {
        if (res.sucesso && res.dados.autenticado) {
          if (routeData && routeData.perfis && routeData.perfis.length > 0) {
            if (!this.authService.usuario) {
              await this.authService.obterPerfilUsuario();
            }
            const perm = this.authService.possuiPerfis(routeData.perfis);
            if (perm) {
              return true;
            } else {
              this.toastr.error('Você não possui acesso a esse recurso.', 'Acesso negado!');
              this.router.navigate(['/']);
              return false;
            }

          } else {
            return true;
          }
        } else {
          this.authService.login();
          return false;
        }
      })
      .catch((err) => {
        this.authService.login();
        return false;
      });
  }
}

*/
