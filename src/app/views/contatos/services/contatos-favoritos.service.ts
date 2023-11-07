import { Injectable } from "@angular/core";

@Injectable()

export class ContatosFavoritosService{
  private obterDados(){
    const dados = localStorage.getItem('contato-fav');

    return dados? JSON.parse(dados) : [];
  }

  public favoritar(id: string){
    const dados = this.obterDados() as any[];

    if(dados == null){
      localStorage.setItem('contato-fav', JSON.stringify(id))
    }
    else{
      let i = dados.findIndex((x: any) => x.id == id);

      if(i == -1){
        dados.push(id);
      }
      else{
        dados.splice(i, 1);
      }

      localStorage.setItem('contato-fav', JSON.stringify(dados));
    }
  }

  public obterListaContatosFav(): any[]{
    return this.obterDados();
  }

  public verificarFavorito(id: string): boolean{
    const dados = this.obterDados() as any[];

    return dados.find((x: any) => x.id == id) as boolean;
  }
}