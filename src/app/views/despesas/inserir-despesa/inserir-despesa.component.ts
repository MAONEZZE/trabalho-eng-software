import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DespesaService } from '../services/despesas.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ListarCategoriaViewModel } from '../../categoria/models/listar-categoria.view-model';
import { CategoriaService } from '../../categoria/services/categorias.service';

@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './inserir-despesa.component.html',
  styleUrls: ['./inserir-despesa.component.css']
})
export class InserirDespesaComponent implements OnInit{
  form!: FormGroup;
  categorias: ListarCategoriaViewModel[] = [];
  despesaVM!: FormsDespesaViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private router: Router,
    ){}
    
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
      valor: new FormControl('', [Validators.required, Validators.min(0.1)]),
      data: new FormControl(new Date().toString().substring(0, 10), Validators.required),
      formaPagamento: new FormControl(0, [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    this.categoriaService.selecionarTodos().subscribe((res) => {
      this.categorias = res;
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

    this.despesaVM = this.form.value;

    this.despesaService.inserir(this.despesaVM).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    })
  }

  processarSucesso(){
    this.toastService.success(`A despesa foi cadastrado com sucesso!`, 'Sucesso');
    this.router.navigate(['/despesas/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
