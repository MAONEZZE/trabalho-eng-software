import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InserirContatoComponent } from './inserir-contato/inserir-contato.component';
import { ContatosService } from './services/contatos.service';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';
import { CardComponent } from './card/card.component';
import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatosFavoritosService } from './services/contatos-favoritos.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


import 'src/app/extensions/form-group.extensions'

@NgModule({
  declarations: [InserirContatoComponent, EditarContatoComponent, ListarContatosComponent, ExcluirContatoComponent, CardComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ContatosRoutingModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  providers: [ContatosService, ContatosFavoritosService] 
  //nos modulos declara components e registra serviços
})
export class ContatosModule { }
