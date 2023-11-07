import { Component, Input } from '@angular/core';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() despesa!: ListarDespesaViewModel;
}
