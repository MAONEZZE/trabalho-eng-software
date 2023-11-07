import { Component, OnInit } from '@angular/core';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefaService } from '../services/tarefas.service';
import { ItemTarefaViewModel } from '../models/item-tarefa.view-model';
import { StatusItemTarefa } from '../models/status-item.enum';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styleUrls: ['./inserir-tarefa.component.css']
})
export class InserirTarefaComponent implements OnInit{
  tarefaVM!: FormsTarefaViewModel;
  form!: FormGroup;
  tituloItens!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private tarefaService: TarefaService,
    private router: Router
  ){}

  get itens(): FormArray{
    return this.form.get('itens') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: [0, [Validators.required]],
      itens: new FormArray([])
    });

    this.tituloItens= this.formBuilder.control('');
  }

  adicionarItem(){
    const item: ItemTarefaViewModel = {
      titulo: this.tituloItens.value,
      status: StatusItemTarefa.Adicionado,
      concluido: false
    }

    const novoItemGroup = this.formBuilder.group({
      titulo: [item.titulo],
      status: [item. status],
      consluido: [item.concluido]
    });

    this.itens.push(novoItemGroup);

    this.tituloItens.reset();
  }

  removerItem(i: number){
    this.itens.removeAt(i);

    this.toastService.success('Item removido', 'Sucesso')
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

    this.tarefaVM = this.form.value

    this.tarefaService.inserir(this.tarefaVM).subscribe({
      next:(tarefa: FormsTarefaViewModel) => this.processarSucesso(tarefa),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(tarefa: FormsTarefaViewModel){
    this.toastService.success(`A tarefa ${tarefa.titulo} foi cadastrado com sucesso!`, 'Sucesso');
    this.router.navigate(['/tarefas/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }


}
