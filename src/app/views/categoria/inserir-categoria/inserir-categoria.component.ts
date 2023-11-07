import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../services/categorias.service';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.css']
})
export class InserirCategoriaComponent implements OnInit{
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;

  constructor(
    private formBuilder: FormBuilder, 
    private categoriaService: CategoriaService, 
    private router: Router, 
    private toastService: ToastrService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(campo: string): boolean{
    const estaInvalido: boolean = !this.form.get(campo)!.pristine && this.form.get(campo)!.invalid;

    return estaInvalido;
  }

  gravar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }

      return;
    }
    
    this.categoriaVM = this.form.value;
    
    this.categoriaService.inserir(this.categoriaVM).subscribe({
      next: (contato: FormsCategoriaViewModel) => this.processarSucesso(contato),
      error: (error: Error) => this.processarFalha(error),
    });
    
  }

  processarSucesso(categoria: FormsCategoriaViewModel){
    this.toastService.success(`A categoria ${categoria.titulo} foi cadastrado com sucesso!`, 'Sucesso');
    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
