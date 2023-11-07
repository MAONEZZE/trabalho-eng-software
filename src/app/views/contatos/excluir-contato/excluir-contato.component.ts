import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styleUrls: ['./excluir-contato.component.css']
})
export class ExcluirContatoComponent implements OnInit {
  contatoVM!: VisualizarContatoViewModel;

  constructor(private contatoService: ContatosService, private route: ActivatedRoute, private router: Router, private toastService: ToastrService){}

  ngOnInit(): void {
    this.contatoVM = this.route.snapshot.data['contato'];
    
  }

  gravar(){
    this.contatoService.excluir(this.contatoVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(){
    this.toastService.success(`O contato foi excluido com sucesso!`, 'Sucesso');
    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }


}
