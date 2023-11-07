import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Route, RouterModule, Routes } from "@angular/router";
import { ListarDespesasComponent } from "./listar-despesas/listar-despesas.component";
import { EditarDespesaComponent } from "./editar-despesa/editar-despesa.component";
import { ExcluirDespesaComponent } from "./excluir-despesa/excluir-despesa.component";
import { InserirDespesaComponent } from "./inserir-despesa/inserir-despesa.component";
import { ListarDespesaViewModel } from "./models/listar-despesa.view-model";
import { VisualizarDespesaViewModel } from "./models/visualizar-despesa.view-model";
import { DespesaService } from "./services/despesas.service";
import { FormsDespesaViewModel } from "./models/forms-despesa.view-model";

const listarDespesasResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
}

const formsDespesaResolver: ResolveFn<FormsDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(DespesaService).selecionarPorId(route.paramMap.get('id')!)
}

const visualizarDespesaResolver: ResolveFn<VisualizarDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(DespesaService).selecionarDespesaCompletaPorId(route.paramMap.get('id')!)
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarDespesasComponent,
    resolve: { 'despesas': listarDespesasResolver }
  },
  {
    path: 'editar/:id',
    component: EditarDespesaComponent,
    resolve: { 'despesa': formsDespesaResolver }
  },
  {
    path: 'excluir/:id',
    component: ExcluirDespesaComponent,
    resolve: { 'despesa': visualizarDespesaResolver }
  },
  {
    path: 'inserir',
    component: InserirDespesaComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DespesasRoutingModule {}