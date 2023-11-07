import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { TokenViewModel } from "../models/token.view-model";
import { RegistrarUserViewModel } from "../models/registrar-usuario.view-model";
import { LocalStorageService } from "./local-storage.service";
import { AutenticarUserViewModel } from "../models/autenticar-user.view-model";
import { UsuarioTokenViewModel } from "../models/usuario-token.view-model";
import { Token } from "@angular/compiler";

@Injectable()

export class AuthService{
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/'

  private endpointRegistrar: string = this.endpoint + 'registrar';
  private endpointLogin: string = this.endpoint + 'autenticar';
  private endpointLogout: string = this.endpoint + 'sair';

  private usuarioAutenticado: BehaviorSubject<UsuarioTokenViewModel | undefined>;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService){
    this.usuarioAutenticado = new BehaviorSubject<UsuarioTokenViewModel | undefined>(undefined);
  }

  private notificarLogin(user: UsuarioTokenViewModel): void {
    this.usuarioAutenticado.next(user) 
  }

  private notificarLogOut(){
    this.usuarioAutenticado.next(undefined); // o next serve para atualizar (dar um outro subscribe) um determinado 
                                            // atributo nos objetos que estão inscritos (.subscribe) nesse metodo
  }

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

  public obterUsuarioAutenticado(): Observable<UsuarioTokenViewModel | undefined>{
    return this.usuarioAutenticado.asObservable();
  }

  public registrar(user: RegistrarUserViewModel): Observable<TokenViewModel>{
    return this.http.post<any>(this.endpointRegistrar, user)
      .pipe(
        //Mapeia a resposta completa para retornar apenas os dados
        map((res) => res.dados),

        //Obtem o retorno do map e salvar no local-storage
        tap((dados: TokenViewModel) => this.localStorageService.salvarDadosLocaisUser(dados)),
        
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public login(user: AutenticarUserViewModel): Observable<TokenViewModel>{
    return this.http.post<any>(this.endpointLogin, user)
      .pipe(
        //Mapeia a resposta completa para retornar apenas os dados
        map((res) => res.dados),

        //Obtem o retorno do map e salvar no local-storage
        tap((dados: TokenViewModel) => this.localStorageService.salvarDadosLocaisUser(dados)),
        
        tap((dados: TokenViewModel) => this.notificarLogin(dados.usuarioToken)),

        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  private obterHeadersAutorizacao() {
    const token = this.localStorageService.obterDadosLocaisSalvos()?.chave;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  public logout(){
    return this.http.post<any>(this.endpointLogout, {}, this.obterHeadersAutorizacao())
      .pipe(
        tap(() => this.notificarLogOut()),
        tap(() => this.localStorageService.limparDadosLocais())
      );
  }

  public logarUsuarioSalvo(){
    const dados = this.localStorageService.obterDadosLocaisSalvos();

    if(!dados){
      return;
    }

    //Data de expiração do token
    const tokenEstaValido: boolean = new Date(dados.dataExpiracao) > new Date();

    // Notificar o login
    if(tokenEstaValido){
      this.notificarLogin(dados.usuarioToken);
    }
  }
}