import { APP_INITIALIZER, LOCALE_ID, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './core/auth/services/auth.service';
import { LoginModule } from './views/login/login.module';
import { RegistroModule } from './views/registro/registro.module';
import { LocalStorageService } from './core/auth/services/local-storage.service';
import { httpTokenInterceptor } from './core/auth/services/http-token.interceptor';
import { loadingInterceptor } from './core/loading/interceptor-loading';
import { LoadingService } from './core/loading/loading.service';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'


function logarUsuarioSalvoFactory(authService: AuthService){
  return () => authService.logarUsuarioSalvo();
}

const locale = 'pt-BR'

registerLocaleData(localePt, locale)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    BrowserAnimationsModule, //Para poder usar o toastr

    CoreModule,
    RegistroModule,
    LoginModule,
    DashboardModule,

    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true //Serve para quando vc quiser criar varias vezes esse provider exemplo a baixo
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: logarUsuarioSalvoFactory,
    //   deps: [AuthService],
    //   multi: true 
    // },
    {
      provide: LOCALE_ID, useValue: locale
    },
    provideHttpClient(withInterceptors([httpTokenInterceptor, loadingInterceptor])),
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
