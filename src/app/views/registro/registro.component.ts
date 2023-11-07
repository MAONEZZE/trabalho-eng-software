import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LoadingService } from 'src/app/core/loading/loading.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  form!: FormGroup;
  estaCarregando$!: Observable<boolean>;

  constructor(private loading: LoadingService, private router: Router,private toastService: ToastrService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.estaCarregando$ = this.loading.estaCarregado();
  }

  campoEstaInvalido(campo: string): boolean{
    const estaInvalido: boolean = !this.form.get(campo)!.pristine && this.form.get(campo)!.invalid;

    return estaInvalido;
  }

  registrar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }
      return;
    }

    this.authService.registrar(this.form.value).subscribe({
      next: (token) => this.processarSucesso(token),
      error: (err) => this.processarFalha(err)
    })
  }

  processarSucesso(registro: any){
    this.toastService.success(`${registro.usuarioToken.nome} foi registrado com sucesso!`, 'Sucesso');
    this.router.navigate(['/dashboard']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
