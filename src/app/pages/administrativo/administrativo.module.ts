import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativoRoutingModule } from './administrativo-routing.module';
import { CedulaCComponent } from './cedula-c/cedula-c.component';
import { ContraChequeComponent } from './contra-cheque/contra-cheque.component';
import { SharedModule } from '@app/@shared';

@NgModule({
  declarations: [CedulaCComponent, ContraChequeComponent],
  imports: [CommonModule, AdministrativoRoutingModule, SharedModule],
})
export class AdministrativoModule {}
