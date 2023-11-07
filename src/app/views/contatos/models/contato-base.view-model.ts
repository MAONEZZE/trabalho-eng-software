export class ContatoBase{
  nome: string;
  telefone: string;
  cargo:string;
  empresa: string;
  favorito: boolean;

  constructor(nome: string, telefone: string, cargo: string, empresa: string, favorito: boolean){
    this.nome = nome;
    this.telefone = telefone;
    this.cargo = cargo;
    this.empresa = empresa;
    this.favorito = favorito;
  }
}