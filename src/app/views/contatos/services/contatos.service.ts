import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from "rxjs";

import { ListarContatoViewModel } from "../models/listar-contato.view-model";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";
import { ContatoBase } from "../models/contato-base.view-model";

@Injectable()

export class ContatosService{
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/contatos';

  constructor(private http: HttpClient){}

  private processarErroHttp(error: HttpErrorResponse){
    let msgErro = '';

    if(error.status == 401){
      msgErro = 'O usuário não está autorizado. Faça o o login e tente novamente.'
    }
    else if(error.status == 0){
      msgErro = 'Ocorreu um erro ao processar a requisição.'
    }
    else{
      msgErro = error.error?.erros[0]
    }
    return throwError(() => new Error(msgErro))
  }

  public inserir(contato: any): Observable<FormsContatoViewModel>{
    return this.http
      .post<any>(this.endpoint + '/', contato)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public editar(id: string, contato: FormsContatoViewModel){
    return this.http.put<any>(this.endpoint  + '/' + id, contato)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public favoritarContato(id: string, contato: ContatoBase){
    return this.http.put<any>(this.endpoint + '/favoritos/' + id, contato)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public excluir(id: string): Observable<any>{
    return this.http.delete(this.endpoint + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public selecionarTodos(status: number): Observable<ListarContatoViewModel[]>{
    return this.http
      .get<any>(this.endpoint + `?statusFavorito=${status}`)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel>{
    return this.http
    .get<any>(this.endpoint + '/' + id)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarContatoCompletoPorId(id: string){
    return this.http
    .get<any>(this.endpoint + '/visualizacao-completa/' + id)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }
}
