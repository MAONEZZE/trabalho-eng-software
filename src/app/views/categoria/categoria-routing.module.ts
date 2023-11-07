import { NgModule, inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Route, RouterModule, Routes } from "@angular/router";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { EditarCategoriaComponent } from "./editar-categoria/editar-categoria.component";
import { ExcluirCategoriaComponent } from "./excluir-categoria/excluir-categoria.component";
import { InserirCategoriaComponent } from "./inserir-categoria/inserir-categoria.component";
import { FormsCategoriaViewModel } from "./models/forms-categoria.view-model";
import { ListarCategoriaViewModel } from "./models/listar-categoria.view-model";
import { VisualizarCategoriaViewModel } from "./models/visualizar-categoria.view-model";
import { CategoriaService } from "./services/categorias.service";

const listarCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriaService).selecionarTodos();
}

const formsCategoriaResolver: ResolveFn<FormsCategoriaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(CategoriaService).selecionarPorId(route.paramMap.get('id')!)
}

const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(CategoriaService).selecionarCategoriaCompletaPorId(route.paramMap.get('id')!)
}

const routes: Routes = [
  {
    path:'',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarCategoriasComponent,
    resolve: { 'categorias': listarCategoriasResolver }
  },
  {
    path: 'editar/:id',
    component: EditarCategoriaComponent,
    resolve: { 'categoria': formsCategoriaResolver }
  },
  {
    path: 'excluir/:id',
    component: ExcluirCategoriaComponent,
    resolve: { 'categoria': visualizarCategoriaResolver }
  },
  {
    path:'inserir',
    component: InserirCategoriaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriasRoutingModule {}
