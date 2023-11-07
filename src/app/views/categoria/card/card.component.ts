import { Component, Input } from '@angular/core';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() categoria!: ListarCategoriaViewModel;
}
