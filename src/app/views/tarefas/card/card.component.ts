import { Component, Input, OnInit } from '@angular/core';
import { ListarTarefaViewModel } from '../models/listar-tarefas.view-model';
import { VisualizarTarefaViewModel } from '../models/visualizar-tarefa.view-model';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from '../services/tarefas.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent{
  @Input() tarefa!: VisualizarTarefaViewModel;
}
