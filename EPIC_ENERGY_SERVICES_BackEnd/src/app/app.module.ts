import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { FattureComponent } from './components/fatture/fatture.component';
const rotte: Route[] = [
  // { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
      path: 'clienti',
      component: ClientiComponent,
      // canActivate: [AuthGuard]
  },
  {
      path: 'fatture',
      component: FattureComponent,
      // canActivate: [AuthGuard]
   }
// ,
//   {
//     path: 'infoFIlm/:id',
//     component: InfoFilmComponent,
//     // canActivate: [AuthGuard]
// },
//   {
//       path: 'login',
//       component: LoginComponent
//   },
//   {
//       path: 'register',
//       component: RegisterComponent
//   },
//   {
//     path: 'navBar',
//     component: NavBarComponent,
//     canActivate: [AuthGuard]
// },
// {
//   path: 'profilo',
//   component: ProfileComponent,
//   canActivate: [AuthGuard]
// },
]



@NgModule({
  declarations: [
    AppComponent,
    ClientiComponent,
    FattureComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rotte)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
