import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/token.view-model";

@Injectable()
export class LocalStorageService {
  private chaveLocalStorage: string = 'e-agenda-dados';

  public salvarDadosLocaisUser(user: TokenViewModel){
    const jsonString = JSON.stringify(user);

    localStorage.setItem(this.chaveLocalStorage, jsonString);
  }

  public obterDadosLocaisSalvos(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chaveLocalStorage);

    if(!jsonString){
      return undefined;
    }

    return JSON.parse(jsonString) as TokenViewModel;
  }

  public limparDadosLocais(){
    localStorage.setItem(this.chaveLocalStorage, '');
  }
}