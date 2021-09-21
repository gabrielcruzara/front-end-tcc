import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material-module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserDropdownMenuComponent } from './layout/header/user-dropdown-menu/user-dropdown-menu.component';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { BaseFormComponent } from './components/base-form/base-form.component';
import { BaseListComponent } from './components/base-list/base-list.component';
import { LookupModalComponent } from './components/lookup-modal/lookup-modal.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { getPtBrPaginatorIntl } from '../@core/helper/ptbr-paginator-intl';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GravatarModule } from 'ngx-gravatar';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    GravatarModule,
    NgbModule,
    TooltipModule.forRoot(),
    MaterialModule,
  ],
  declarations: [
    LoaderComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    SidebarComponent,
    UserDropdownMenuComponent,
    AppButtonComponent,
    BaseFormComponent,
    BaseListComponent,
    LookupModalComponent,
    FormFieldErrorComponent,
    BreadCrumbComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() }],
  exports: [
    LoaderComponent,
    FormFieldErrorComponent,
    BreadCrumbComponent,
    MainComponent,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
    TooltipModule,
  ],
})
export class SharedModule {}
