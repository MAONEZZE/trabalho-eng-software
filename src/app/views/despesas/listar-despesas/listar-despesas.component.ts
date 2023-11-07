import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent implements OnInit {
  despesas: ListarDespesaViewModel[] = [];

  constructor(private route: ActivatedRoute, private toastService: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['despesas'])).subscribe({
      next: (compromissos) => this.processarSucesso(compromissos),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(despesas: ListarDespesaViewModel[]){
    this.despesas = despesas;
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error')
  }

}
