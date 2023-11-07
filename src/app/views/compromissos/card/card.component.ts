import { Component, Input } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() compromisso: ListarCompromissoViewModel;

  constructor(){
    this.compromisso = new ListarCompromissoViewModel('','','','','','');
  }
}
