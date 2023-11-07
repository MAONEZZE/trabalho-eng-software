import { Component, OnInit } from '@angular/core';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit{
  categorias: ListarCategoriaViewModel[] = [];

  constructor(private route: ActivatedRoute, private toastService: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['categorias'])).subscribe({
      next: (categorias) => this.processarSucesso(categorias),
      error: (err: Error) => this.processarFalha(err)
    })
  }

  processarSucesso(categorias: ListarCategoriaViewModel[]){
    this.categorias = categorias;
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error')
  }
}
