import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { DistribuidorService } from '../services/distribuidor.service';
import { Distribuidor } from './Distribuidor';

@Component({
  selector: 'app-distribuidores',
  templateUrl: './distribuidores.component.html',
  styleUrls: ['./distribuidores.component.scss'],
})
export class DistribuidoresComponent implements OnInit {
  distribuidores: Distribuidor[] = [];
  distribuidor: Distribuidor = this.limpiarDistribuidor();
  mostrarEditar: boolean = false;
  mostrarAgregar: boolean = false;
  constructor(
    private _service: DistribuidorService,
    private loginService: LoginService,
    private router: Router
  ) {
    if (!this.loginService.existeToken()) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    this.obtenerDistribuidores();
  }
  obtenerDistribuidores(): void {
    this.mostrarEditar = false;
    this.mostrarAgregar = false;
    this._service
      .obtenerDistribuidores()
      .subscribe((data) => (this.distribuidores = data));
  }
  abrirFormulario(id?: string) {
    if (id) {
      this._service
        .obtenerDistribuidor(id)
        .subscribe((data) => (this.distribuidor = data));
      this.mostrarEditar = true;
    } else {
      this.distribuidor = this.limpiarDistribuidor();
      this.mostrarAgregar = true;
    }
  }
  agregarDistribuidor(): void {
    this._service.agregarDistribuidor(this.distribuidor).subscribe((): void => {
      this.obtenerDistribuidores();
    });
  }
  actualizarDistribuidor(): void {
    this._service
      .actualizarDistribuidor(this.distribuidor)
      .subscribe((): void => {
        this.obtenerDistribuidores();
      });
  }
  eliminarDistribuidor(id?: string) {
    if (id) {
      this._service.eliminarDistribuidor(id).subscribe((): void => {
        this.obtenerDistribuidores();
      });
    }
  }
  limpiarDistribuidor() {
    return {
      _id: '',
      vendedor: '',
      telefono: '',
      direccion: '',
      localidad: '',
    };
  }
}
