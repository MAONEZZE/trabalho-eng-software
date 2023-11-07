import { Component, OnInit } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ContatosFavoritosService } from '../services/contatos-favoritos.service';
import { ContatosService } from '../services/contatos.service';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit{
  contatos: ListarContatoViewModel[] = [];
  favClicado: boolean = false;

  constructor(private contatoService: ContatosService, private route: ActivatedRoute, private toastService: ToastrService, private localStorageContatos: ContatosFavoritosService){}

  ngOnInit(): void {
    this.pegarContatosResolver();
  }

  pegarContatosResolver(){
    this.route.data.pipe(map(dados => dados['contatos'] )).subscribe({
      next: (contatos) => this.processarSucesso(contatos),
      error: (err) => this.processarFalha(err),
    });
  }

  removerFav(event: ListarContatoViewModel){
    if(this.favClicado){
      const i = this.contatos.findIndex((x) => x.id == event.id);

      this.contatos.splice(i, 1);
    }
  }

  pegarContatos(op: number){
    this.contatoService.selecionarTodos(op).subscribe({
      next: (contatos) => this.processarSucesso(contatos),
      error: (err) => this.processarFalha(err),
    });
  }

  buscarFav(){
    this.favClicado = !this.favClicado;

    if(this.favClicado == false){
      this.pegarContatos(0);
    }
    else{
      this.pegarContatos(1);
    }

  }

  processarSucesso(contatos: ListarContatoViewModel[]){
    this.contatos = contatos;
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error')
  }
}
