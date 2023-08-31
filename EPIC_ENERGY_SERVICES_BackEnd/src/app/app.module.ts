import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './services/app.service';
import { ClientiComponent } from './components/clienti/clienti.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';

const rotte: Route[] = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'clienti',
    component: ClientiComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'fatture',
    component: FattureComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientiComponent,
    FattureComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rotte),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Modifica 'access_token' con 'token'
        allowedDomains: ['localhost:3001'], // Rimuovi 'http://' e '/auth/login'
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
