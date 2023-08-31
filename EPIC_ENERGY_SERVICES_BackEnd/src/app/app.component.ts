import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EPIC_ENERGY_SERVICES_BackEnd';

  constructor(private router: Router) {}

  shouldShowNavbar(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/login' && currentRoute !== '/register'&& currentRoute !== '/navbar';
  }
}
