import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { ListarTarefaViewModel } from './models/listar-tarefas.view-model';
import { TarefaService } from './services/tarefas.service';
import { FormsTarefaViewModel } from './models/forms-tarefa.view-model';
import { VisualizarTarefaViewModel } from './models/visualizar-tarefa.view-model';

const listarTarefasResolver: ResolveFn<ListarTarefaViewModel[]> = () => {
  return inject(TarefaService).selecionarTodos();
}

const listarTarefasCompletasResolver: ResolveFn<VisualizarTarefaViewModel[]> = () => {
  return inject(TarefaService).selecionarTodosCompletos();
}

const formsTarefaResolver: ResolveFn<FormsTarefaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(TarefaService).selecionarPorId(route.paramMap.get('id')!)
}

const visualizarTarefaResolver: ResolveFn<VisualizarTarefaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(TarefaService).selecionarTarefaCompletaPorId(route.paramMap.get('id')!)
}

const routes : Routes =[
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarTarefasComponent,
    resolve: { 'tarefas': listarTarefasCompletasResolver }
  },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: { 'tarefa': formsTarefaResolver}
  },
  {
    path: 'excluir/:id',
    component: ExcluirTarefaComponent,
    resolve: { 'tarefa': visualizarTarefaResolver}
  },
  {
    path: 'inserir',
    component: InserirTarefaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
