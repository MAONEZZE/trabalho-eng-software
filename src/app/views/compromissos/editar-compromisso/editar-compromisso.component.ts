import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../../contatos/services/contatos.service';
import { CompromissoService } from '../services/compromissos.service';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { FormCompromissoViewModel } from '../models/forms-compromisso.view-model';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent implements OnInit{
  form!: FormGroup;
  contatos: ListarContatoViewModel[] = [];
  compromissoVM!: FormCompromissoViewModel;

  constructor(
    private contatoService: ContatosService, 
    private formBuilder: FormBuilder, 
    private compromissoService: CompromissoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastService: ToastrService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required, Validators.minLength(3)]),
      local: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl(''),
      link: new FormControl(''),
      data: new FormControl(new Date(), [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      contatoId: new FormControl(''),
    });

    this.carregarContatos();

    const compromisso = this.route.snapshot.data['compromisso'];

    this.form.patchValue(compromisso);

    this.formatarData();
  }

  formatarData(){
    const dataFormatada = this.compromissoVM?.data.toString().substring(0, 10);
    this.form.patchValue({ data: dataFormatada });
  }

  campoEstaInvalido(campo: string): boolean{
    const estaInvalido: boolean = !this.form.get(campo)!.pristine && this.form.get(campo)!.invalid;

    return estaInvalido;
  }

  carregarContatos(){
    this.contatoService.selecionarTodos(0).subscribe((res) => {
      this.contatos = res;
    });
  }

  gravar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }

      return;
    }

    this.compromissoVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id')!;

    this.compromissoService.editar(id, this.compromissoVM).subscribe({
      next: (compromisso) => this.processarSucesso(compromisso),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(compromisso: FormCompromissoViewModel){
    this.toastService.success(`O compromisso ${compromisso.assunto} foi editado com sucesso!`, 'Sucesso');
    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
