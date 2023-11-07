import { Component, OnInit } from '@angular/core';
import { VisualizarTarefaViewModel } from '../models/visualizar-tarefa.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefaService } from '../services/tarefas.service';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';
import { VisualizarItemTarefaViewModel } from '../models/visualizar-item-tarefa.view-model';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styleUrls: ['./excluir-tarefa.component.css']
})
export class ExcluirTarefaComponent implements OnInit{
  tarefaVM!: VisualizarTarefaViewModel;

  constructor(private route: ActivatedRoute, private router: Router,private toastService: ToastrService, private tarefaService: TarefaService){}
  
  ngOnInit(): void {
    this.tarefaVM = this.route.snapshot.data['tarefa'];
  }

  gravar(){
    this.tarefaService.excluir(this.tarefaVM.id).subscribe({
      next:(tarefa: FormsTarefaViewModel) => this.processarSucesso(tarefa),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  estaPendente(item: VisualizarItemTarefaViewModel): boolean{
    return item.situacao == 'Pendente';
  }

  processarSucesso(tarefa: FormsTarefaViewModel){
    this.toastService.success(`A tarefa ${tarefa.titulo} foi cadastrado com sucesso!`, 'Sucesso');
    this.router.navigate(['/tarefas/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
