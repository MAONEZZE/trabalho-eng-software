import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from '../services/despesas.service';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-despesa',
  templateUrl: './excluir-despesa.component.html',
  styleUrls: ['./excluir-despesa.component.css']
})
export class ExcluirDespesaComponent implements OnInit{
  despesaVM!: VisualizarDespesaViewModel;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private despesaService: DespesaService,
    private toastService: ToastrService){}

  ngOnInit(): void {
    this.despesaVM = this.route.snapshot.data['despesa'];
  }

  gravar(){
    this.despesaService.excluir(this.despesaVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(){
    this.toastService.success(`A despesa foi excluido com sucesso!`, 'Sucesso');
    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }

}
