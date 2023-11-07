import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { CardComponent } from './card/card.component';
import { DespesaService } from './services/despesas.service';
import { DespesasRoutingModule } from './despesas-routing.module';
import { CategoriaService } from '../categoria/services/categorias.service';

import 'src/app/extensions/form-group.extensions'

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ListarDespesasComponent, ExcluirDespesaComponent, EditarDespesaComponent, InserirDespesaComponent, CardComponent],
  imports: [CommonModule, ReactiveFormsModule, DespesasRoutingModule, RouterModule, NgSelectModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  providers: [DespesaService, CategoriaService]
})
export class DespesasModule { }
