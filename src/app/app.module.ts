import { CustomAdapter, CustomDateParserFormatter } from './@core/helper/ngb-date-adapter';
import { NgbTimeStringAdapter } from './@core/helper/ngb-time-adapter';
import { MaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { registerLocaleData } from '@angular/common';
import { IConfig } from 'ngx-mask';
import ptBr from '@angular/common/locales/pt';
import { getPtBrPaginatorIntl } from './@core/helper/ptbr-paginator-intl';
import { InicioComponent } from './pages/inicio/inicio.component';
import { environment } from '@env/environment';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

defineLocale('pt-br', ptBrLocale);
registerLocaleData(ptBr);
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule.forRoot({ include: ['/*'] }),
    FormsModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true,
    }),
    ConfirmationPopoverModule.forRoot({
      appendToBody: true,
      confirmButtonType: 'danger',
    }),
    ModalModule.forRoot(),
    // DragDropModule,
    BsDatepickerModule.forRoot(),
    MatPaginatorModule,
    NgbModule,
    CoreModule,
    SharedModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ShellModule,
    ChartsModule,
    AuthModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }), // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, InicioComponent, RelatoriosComponent, DashboardComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
    { provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
