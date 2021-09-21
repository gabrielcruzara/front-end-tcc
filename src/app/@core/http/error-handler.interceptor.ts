import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (response instanceof HttpErrorResponse) {
      if (response.status === 401) {
        sessionStorage.removeItem('credentials');
        window.location.replace('/');
        this.toastr.error('Sua sessão expirou!', 'Atenção');
      }
    }

    throw response;
  }
}

/* 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authService = this.injector.get(AuthService);

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          authService.login();
          // window.location.replace('/conta/login?returnUrl=' + window.location);
          return next.handle(null);
        }
        // return throwError(error);

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred
          // TODO: Implementar tratativas para erro client-side e de rede


        } else {
          // Se for um retorno padronizado do backend
          if (error.error && error.error.sucesso !== undefined && error.error.mensagem !== undefined) {
            return throwError(error.error as IBaseModel<any>);
          }
        }

        // Retorno padrão
        return throwError({ sucesso: false, mensagem: { nome: 'ErroInterno', descricao: 'Ocorreu um erro ao tentar realizar a operação' } } as IBaseModel<any>);
      }));
  }
}

*/
