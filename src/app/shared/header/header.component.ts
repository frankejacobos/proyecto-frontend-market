import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: any[] = [];
  logout: any = {};
  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.actualizar.subscribe(() => {
      this.verificar();
    });
  }
  ngOnInit(): void {
    this.verificar();
  }
  verificar() {
    if (this.loginService.existeToken()) {
      this.items = [
        { nombre: 'clientes', icon: 'person' },
        { nombre: 'distribuidores', icon: 'local_shipping' },
        { nombre: 'categorias', icon: 'category' },
        { nombre: 'productos', icon: 'inventory' },
        { nombre: 'ventas', icon: 'paid' },
      ];
      this.logout = { nombre: 'Cerrar Sesión', icon: 'logout' };
    } else {
      this.logout = { nombre: '', icon: '' };
      this.items = [{ nombre: 'login', icon: 'login' }];
    }
  }
  logoutUser() {
    this.loginService.borrarUser();
    this.loginService.actualizar.emit(true);
    this.router.navigate(['/']);
  }
}
