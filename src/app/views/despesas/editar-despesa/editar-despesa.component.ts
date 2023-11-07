import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from '../services/despesas.service';
import { ToastrService } from 'ngx-toastr';
import { ListarCategoriaViewModel } from '../../categoria/models/listar-categoria.view-model';
import { CategoriaService } from '../../categoria/services/categorias.service';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styleUrls: ['./editar-despesa.component.css']
})
export class EditarDespesaComponent implements OnInit{
  form!: FormGroup;
  categorias: ListarCategoriaViewModel[] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private toastService: ToastrService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ){}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
      valor: new FormControl('', [Validators.required, Validators.min(0.1)]),
      data: new FormControl(new Date().toString().substring(0, 10), Validators.required),
      formaPagamento: new FormControl(0, [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    const despesa = this.route.snapshot.data['despesa'];

    this.form.patchValue(despesa);

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
        this.toastService.error(item)
      }

      return; 
    }

    const id = this.route.snapshot.paramMap.get('id')!;

    this.despesaService.editar(id, this.form.value).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    })
  }

  processarSucesso(){
    this.toastService.success(`A despesa foi editada com sucesso!`, 'Sucesso');
    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
