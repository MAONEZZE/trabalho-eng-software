import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemTarefaViewModel } from '../models/item-tarefa.view-model';
import { StatusItemTarefa } from '../models/status-item.enum';
import { TarefaService } from '../services/tarefas.service';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent {
  tarefaVM!: FormsTarefaViewModel;
  form!: FormGroup;
  tituloItens!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute
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

    const tarefa = this.route.snapshot.data['tarefa'];

    this.form.patchValue(tarefa);

    for(let item of tarefa.itens){
      const novoItemGroup = this.formBuilder.group({
        id: [item.id],
        titulo: [item.titulo],
        status: [item.status],
        concluido: [item.concluido]
      });

      this.itens.push(novoItemGroup)
    }
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
      concluido: [item.concluido]
    });

    this.itens.push(novoItemGroup);

    this.tituloItens.reset();
  }
  
  campoEstaInvalido(campo: string): boolean{
    const estaInvalido: boolean = !this.form.get(campo)!.pristine && this.form.get(campo)!.invalid;

    return estaInvalido;
  }

  concluirItem(i: number){
    const grupo = this.itens.controls.at(i);

    const valorAtual = grupo?.get('concluido')?.value as boolean;

    const valorAlterado = !valorAtual;

    grupo?.patchValue({ concluido: valorAlterado })

    this.toastService.success('Item concluido', 'Sucesso')
  }

  removerItem(i: number){
    const grupo = this.itens.controls.at(i);

    const valorAtual = grupo?.get('status')?.value as StatusItemTarefa;

    const valorAlterado = 
      valorAtual == StatusItemTarefa.Removido
        ? StatusItemTarefa.Inalterado 
        : StatusItemTarefa.Removido;

    grupo?.patchValue({ status: valorAlterado })

    if(valorAlterado == StatusItemTarefa.Removido){
      this.toastService.success('Item removido', 'Sucesso')
    }
    else{
      this.toastService.success('Item restaurado', 'Sucesso')
    }
  }

  gravar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }
      return;
    }

    this.tarefaVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id')!;

    this.tarefaService.editar(id, this.tarefaVM).subscribe({
      next:(tarefa: FormsTarefaViewModel) => this.processarSucesso(tarefa),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(tarefa: FormsTarefaViewModel){
    this.toastService.success(`A tarefa ${tarefa.titulo} foi editada com sucesso!`, 'Sucesso');
    this.router.navigate(['/tarefas/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
