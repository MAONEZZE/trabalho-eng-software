import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, NgbModule, AuthModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatToolbarModule],
  exports: [NavbarComponent, AuthModule]
})
export class CoreModule { }
