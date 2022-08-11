import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserRequest } from './User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userRequest: UserRequest = { email: '', password: '' };
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {
    if (this.loginService.existeToken()) {
      this.loginService.guardarUser(this.loginService.getUser());
    }
  }
  iniciarSesion() {
    this.loginService.login(this.userRequest).subscribe((res) => {
      this.loginService.guardarUser(res.user);
      this.loginService.actualizar.emit(true);
      this.router.navigate(['/']);
    });
  }
}
