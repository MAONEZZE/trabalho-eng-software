import { ContatoBase } from "./contato-base.view-model";

export class VisualizarContatoViewModel extends ContatoBase{
  id: string;
  email: string;

  constructor(id: string, nome: string, email: string, telefone: string, cargo: string, empresa: string, favorito: boolean){
    super(nome, telefone, cargo, empresa, favorito);
    this.id = id;
    this.email = email
  }
}