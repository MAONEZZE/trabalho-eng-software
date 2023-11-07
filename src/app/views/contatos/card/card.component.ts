import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../services/contatos.service';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ContatoBase } from '../models/contato-base.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() contato!: ListarContatoViewModel;
  @Input() contatoFav!: FormsContatoViewModel;
  @Output() onDesfavoritarCard: EventEmitter<ListarContatoViewModel>;

  constructor(private contatoService: ContatosService, private toastService: ToastrService){
    this.onDesfavoritarCard = new EventEmitter();
  }

  adicionarFavorito(id: string){
    this.contato.favorito = !this.contato.favorito;

    this.contatoService.favoritarContato(id, this.contato).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });

    this.onDesfavoritarCard.emit(this.contato);
  }

  processarSucesso(){
    this.contato.favorito == true? 
      this.toastService.success(`Contato ${this.contato.nome} adicionado aos favoritos!`) :
      this.toastService.error(`Contato ${this.contato.nome} removido dos favoritos!`)
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
