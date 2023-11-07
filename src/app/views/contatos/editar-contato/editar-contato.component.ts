import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  //idSelecionado: string | null = null;

  constructor(
    private toastService: ToastrService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private contatoService: ContatosService, 
    private router: Router){}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });

    this.contatoVM = this.route.snapshot.data['contato']; //Esse contato é aquele que está no routing module

    this.form.patchValue(this.contatoVM);

    // this.form.setValue({}) O setValue tem que inicializar todos campos, ja o patchValue você pode inicializar só alguns

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

    this.contatoVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      return;
    }

    this.contatoService.editar(id!, this.contatoVM).subscribe({
      next: (contato: FormsContatoViewModel) => this.processarSucesso(contato),
      error: (error: Error) => this.processarFalha(error)
    })
  }

  processarSucesso(contato: FormsContatoViewModel){
    this.toastService.success(`O contato ${contato.nome} foi alterado com sucesso!`, 'Sucesso');
    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
