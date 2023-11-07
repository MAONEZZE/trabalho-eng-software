import { NgModule, inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes, UrlTree } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { Observable, map } from 'rxjs';
import { AuthService } from './core/auth/services/auth.service';
import { authGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'contatos', //As rotas que tiverem essa palavra na rota, serão direcionadas pra cá
    loadChildren: () => import('./views/contatos/contatos.module').then((modulo) => modulo.ContatosModule),
    canActivate: [authGuard]
    //Aqui ele vai importar o modulo e usar as respectivas rotas do modulo
  },
  {
    path:'compromissos',
    loadChildren: () => import('./views/compromissos/compromissos.module').then((modulo) => modulo.CompromissosModule),
    canActivate: [authGuard]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./views/categoria/categoria.module').then((modulo) => modulo.CategoriaModule),
    canActivate: [authGuard]
  },
  {
    path: 'despesas',
    loadChildren: () => import('./views/despesas/despesas.module').then((modulo) => modulo.DespesasModule),
    canActivate: [authGuard]
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./views/tarefas/tarefas.module').then((modulo) => modulo.TarefasModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
