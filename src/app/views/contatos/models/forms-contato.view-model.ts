import { ContatoBase } from "./contato-base.view-model";

export class FormsContatoViewModel extends ContatoBase{
  email: string;

  constructor(nome: string, email: string, telefone: string, cargo: string, empresa: string, favorito: boolean){
    super(nome, telefone, cargo, empresa, favorito);
    this.email = email
  }
}