import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistrarUsuarioComponent } from './auth/registrar-usuario/registrar-usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: 'inicio', component: InicioComponent },
    { path: 'registro-usuario', component: RegistrarUsuarioComponent },
    {
      path: 'administrativo',
      loadChildren: () => import('./pages/administrativo/administrativo.module').then((m) => m.AdministrativoModule),
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'corrected' }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
