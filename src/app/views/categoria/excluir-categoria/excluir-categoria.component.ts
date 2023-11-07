import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../services/categorias.service';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css']
})
export class ExcluirCategoriaComponent implements OnInit{
  categoriaVM!: VisualizarCategoriaViewModel;

  constructor(private toastService: ToastrService, private router: Router, private route: ActivatedRoute, private categoriaService: CategoriaService){}
  
  ngOnInit(): void {
    this.categoriaVM = this.route.snapshot.data['categoria'];
  }

  gravar(){
    this.categoriaService.excluir(this.categoriaVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(){
    this.toastService.success(`O categoria excluida com sucesso!`, 'Sucesso');
    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
