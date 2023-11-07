import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsuarioTokenViewModel } from 'src/app/core/auth/models/usuario-token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  usuario$?: Observable<UsuarioTokenViewModel | undefined>;
  //$ -> é quando é uma observable de alguma coisa

  // usuario?: UsuarioTokenViewModel;

  subscription?: Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(): void {   
    // this.subscription = this.authService.obterUsuarioAutenticado().subscribe((res) => {
    //   this.usuario = res;
    // })
    this.usuario$ = this.authService.obterUsuarioAutenticado();
  }

  // ngOnDestroy(): void { //Fazer apenas para os metodos que ficam consumindo dados da api direto
  //                       //Fazer quando der um subscribe em metodos q são behaviors subject
  //   this.subscription?.unsubscribe();
  // }

}
