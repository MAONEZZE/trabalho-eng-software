import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CategoriaService } from './services/categorias.service';
import { CategoriasRoutingModule } from './categoria-routing.module';

import 'src/app/extensions/form-group.extensions'

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CardComponent, EditarCategoriaComponent, ExcluirCategoriaComponent, InserirCategoriaComponent, ListarCategoriasComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CategoriasRoutingModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  providers: [CategoriaService]
})
export class CategoriaModule { }
