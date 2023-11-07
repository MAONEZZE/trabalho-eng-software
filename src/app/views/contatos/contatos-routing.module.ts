import { NgModule, inject } from "@angular/core";
import { Routes, RouterModule, ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { ListarContatosComponent } from "./listar-contatos/listar-contatos.component";
import { EditarContatoComponent } from "./editar-contato/editar-contato.component";
import { ExcluirContatoComponent } from "./excluir-contato/excluir-contato.component";
import { InserirContatoComponent } from "./inserir-contato/inserir-contato.component";
import { FormsContatoViewModel } from "./models/forms-contato.view-model";
import { ListarContatoViewModel } from "./models/listar-contato.view-model";
import { VisualizarContatoViewModel } from "./models/visualizar-contato.view-model";
import { ContatosService } from "./services/contatos.service";

const listarContatosFavResolver = () => {
  return inject(ContatosService).selecionarTodos(1);
}

const listarContatosResolver: ResolveFn<ListarContatoViewModel[]> = () => {
  return inject(ContatosService).selecionarTodos(0);
}

const formsContatoResolver: ResolveFn<FormsContatoViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(ContatosService).selecionarPorId(route.paramMap.get('id')!);
}

const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(ContatosService).selecionarContatoCompletoPorId(route.paramMap.get('id')!);
} 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarContatosComponent,
    resolve: { 
      contatos: listarContatosResolver,
      contatosFav: listarContatosFavResolver
    }
  },
  {
    path: 'editar/:id',
    component: EditarContatoComponent,
    resolve: { contato: formsContatoResolver }
  },
  {
    path: 'excluir/:id',
    component: ExcluirContatoComponent,
    resolve: { contato: visualizarContatoResolver }
  },
  {
    path:'inserir',
    component: InserirContatoComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)], //no app-routing usamos o forRoot, mas aqui se usa o forChild, pq eles são filhos do app-routing
  exports: [RouterModule],
})

export class ContatosRoutingModule{
  
}