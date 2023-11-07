import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, Observable, map, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormsDespesaViewModel } from "../models/forms-despesa.view-model";
import { ListarDespesaViewModel } from "../models/listar-despesa.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable ()

export class DespesaService{
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/despesas/';

  constructor(private http: HttpClient, private localstorageService: LocalStorageService){}

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
    return throwError(() => new Error(msgErro));
  }

  public inserir(despesa: any): Observable<FormsDespesaViewModel>{
    return this.http.post<any>(this.endpoint, despesa)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public editar(id: string, despesa: FormsDespesaViewModel): Observable<FormsDespesaViewModel>{
    return this.http.put<any>(this.endpoint + id, despesa)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public excluir(id: string): Observable<any>{
    return this.http.delete(this.endpoint + id)
      .pipe(
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]>{
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public selecionarPorId(id: string): Observable<FormsDespesaViewModel>{
    return this.http
    .get<any>(this.endpoint + id)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarDespesaCompletaPorId(id: string){
    return this.http
    .get<any>(this.endpoint + 'visualizacao-completa/' + id)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }
}