import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { DashboardComponent } from './ganho-despesa/dashboard.component';
import { SharedModule } from '@app/@shared';
import { NgxCurrencyModule } from 'ngx-currency';
import { JoyrideModule } from 'ngx-joyride';
import { MensalComponent } from './mensal/mensal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MensalComponent
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    SharedModule, 
    NgxCurrencyModule, 
    JoyrideModule.forRoot()
  ]
})
export class DashModule { }
