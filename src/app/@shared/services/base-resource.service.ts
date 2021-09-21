import { Logger } from './../../@core/logger.service';
import { Injector } from '@angular/core';
import { BaseResourceModel } from '../models/base-resource.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const log = new Logger('App');

export abstract class BaseResourceService /*<T extends BaseResourceModel>*/ {
  // protected http: HttpClient;

  constructor() {
    // protected jsonDataToResourceFn: (jsonData: any) => T // protected injector: Injector, // protected apiPath: string,
    // this.http = injector.get(HttpClient);
  }

  // getAll(token: string): Observable<T[]> {
  //   return this.http
  //     .get(this.apiPath, { headers: this.setHeader(token) })
  //     .pipe(map(this.jsonDataToResources.bind(this)), catchError(this.handleError));
  // }

  // getById(id: string, token: string): Observable<T> {
  //   const url = `${this.apiPath}/${id}`;

  //   return this.http
  //     .get(url, { headers: this.setHeader(token) })
  //     .pipe(map(this.jsonDataToResource.bind(this)), catchError(this.handleError));
  // }

  // create(resource: T, token: string): Observable<T> {
  //   return this.http
  //     .post(this.apiPath, resource, { headers: this.setHeader(token) })
  //     .pipe(map(this.jsonDataToResource.bind(this)), catchError(this.handleError));
  // }

  // update(resource: T, token: string): Observable<T> {
  //   const url = `${this.apiPath}/${resource.id}`;
  //   return this.http.put(url, resource, { headers: this.setHeader(token) }).pipe(
  //     map(() => resource),
  //     catchError(this.handleError)
  //   );
  // }

  // delete(id: string, token: string): Observable<any> {
  //   const url = `${this.apiPath}/${id}`;

  //   return this.http.delete(url, { headers: this.setHeader(token) }).pipe(
  //     map(() => null),
  //     catchError(this.handleError)
  //   );
  // }

  // PROTECTED METHODS

  // protected jsonDataToResources(jsonData: any[]): T[] {
  //   const resources: T[] = [];
  //   jsonData.forEach((element) => resources.push(this.jsonDataToResourceFn(element)));
  //   return resources;
  // }

  // protected jsonDataToResource(jsonData: any): T {
  //   return this.jsonDataToResourceFn(jsonData);
  // }

  // protected handleError(error: any): Observable<any> {
  //   log.debug(`ERRO NA REQUISIÇÃO => ' ${error}`);
  //   return throwError(error);
  // }

  protected setHeader(token: string): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }
}
