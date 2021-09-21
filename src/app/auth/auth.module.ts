import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    I18nModule,
    AuthRoutingModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  declarations: [LoginComponent, AlterarSenhaComponent, RegistrarUsuarioComponent],
})
export class AuthModule {}
