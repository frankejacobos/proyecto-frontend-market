import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  constructor(private loginService: LoginService, private router: Router) {
    if (!this.loginService.existeToken()) {
      this.router.navigate(['/']);
    }
  }
}
