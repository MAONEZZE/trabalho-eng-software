import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../services/compromissos.service';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit{
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private route: ActivatedRoute, private toastService: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['compromissos'])).subscribe({
      next: (compromissos) => this.processarSucesso(compromissos),
      error: (err: Error) => this.processarFalha(err)
    });
  }

  processarSucesso(compromissos: ListarCompromissoViewModel[]){
    this.compromissos = compromissos;
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error')
  }

}
