import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Assumi che tu abbia un servizio per la gestione dell'autenticazione

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}


}
