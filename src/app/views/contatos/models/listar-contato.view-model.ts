import { ContatoBase } from "./contato-base.view-model"

export class ListarContatoViewModel extends ContatoBase{
  id: string;

  constructor(id: string, nome: string, telefone: string, cargo: string, empresa: string, favorito: boolean){
    super(nome, telefone, cargo, empresa, favorito);
    this.id = id;
  }
}