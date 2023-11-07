import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../services/compromissos.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent implements OnInit{
  compromissoVM!: VisualizarCompromissoViewModel

  constructor(
    private compromissoService: CompromissoService, 
    private toastService: ToastrService, 
    private router: Router, 
    private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.compromissoVM = this.route.snapshot.data['compromisso'];
  }

  gravar(){
    this.compromissoService.excluir(this.compromissoVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(){
    this.toastService.success(`O compromisso excluido com sucesso!`, 'Sucesso');
    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }

}
