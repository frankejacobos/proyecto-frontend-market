import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from './Cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = this.limpiarCliente();
  mostrarEditar: boolean = false;
  mostrarAgregar: boolean = false;
  tipo_documento = ['ruc', 'dni'];
  tipo_persona = ['natural', 'juridica'];
  constructor(
    private _service: ClienteService,
    private loginService: LoginService,
    private router: Router
  ) {
    if (!this.loginService.existeToken()) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    this.obtenerClientes();
  }
  obtenerClientes(): void {
    this.mostrarEditar = false;
    this.mostrarAgregar = false;
    this._service.obtenerClientes().subscribe((data) => (this.clientes = data));
  }
  abrirFormulario(id?: string): void {
    if (id) {
      this._service
        .obtenerCliente(id)
        .subscribe((data) => (this.cliente = data));
      this.mostrarEditar = true;
    } else {
      this.cliente = this.limpiarCliente();
      this.mostrarAgregar = true;
    }
  }
  agregarCliente(): void {
    this._service.agregarCliente(this.cliente).subscribe((): void => {
      this.obtenerClientes();
    });
  }
  actualizarCliente(): void {
    this._service.actualizarCliente(this.cliente).subscribe((): void => {
      this.obtenerClientes();
    });
  }
  eliminarCliente(id?: string): void {
    if (id) {
      this._service.eliminarCliente(id).subscribe((): void => {
        this.obtenerClientes();
      });
    }
  }
  limpiarCliente() {
    return {
      _id: '',
      nombre_de_persona: '',
      tipo_de_persona: '',
      tipo_de_documento: '',
      numero_de_documento: 0,
      direccion: '',
      localidad: '',
      correo: '',
      telefono: '',
    };
  }
}
