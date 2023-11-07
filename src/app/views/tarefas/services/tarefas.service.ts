import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsTarefaViewModel } from "../models/forms-tarefa.view-model";
import { Observable, catchError, forkJoin, map, switchMap, throwError } from "rxjs";
import { ListarTarefaViewModel } from "../models/listar-tarefas.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()

export class TarefaService{
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/tarefas/';

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
  
  public inserir(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel>{
    return this.http.post<any>(this.endpoint, tarefa)
      .pipe(
        map((res) => res.dados), 
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      )
  }

  public editar(id: string, tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel>{
    return this.http.put<any>(this.endpoint + id, tarefa)
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

  public selecionarTodos(): Observable<ListarTarefaViewModel[]>{
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public selecionarTodosCompletos(){
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        switchMap((res) => {
          const observables = []

          for(let item of res.dados){
            observables.push(this.selecionarTarefaCompletaPorId(item.id));
          }

          return forkJoin(observables);
        }),

        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );

  }

  public selecionarPorId(id: string): Observable<FormsTarefaViewModel>{
    return this.http
    .get<any>(this.endpoint + id)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarTarefaCompletaPorId(id: string){
    return this.http
    .get<any>(this.endpoint + 'visualizacao-completa/' + id)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }
}