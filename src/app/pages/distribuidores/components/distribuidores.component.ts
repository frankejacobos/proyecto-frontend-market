import { Component, OnInit } from '@angular/core';
import { DistribuidorService } from '../services/distribuidor.service';

interface Distribuidor { _id: string; vendedor: string; telefono: string; direccion: string; localidad: string; }

@Component({
  selector: 'app-distribuidores',
  templateUrl: './distribuidores.component.html',
  styleUrls: ['./distribuidores.component.scss']
})
export class DistribuidoresComponent implements OnInit {

  constructor(private _service: DistribuidorService) { }
  distribuidores: Distribuidor[] = []
  distribuidor: Distribuidor = { _id: '', vendedor: '', telefono: '', direccion: '', localidad: '' }
  mostrarEditar: boolean = false
  mostrarAgregar: boolean = false
  ngOnInit(): void {
    this.obtenerDistribuidores()
  }
  abrirEditar(id: string): void {
    this._service.obtenerDistribuidores()
      .subscribe((data) => this.distribuidor = data.find((p: { _id: string; }) => p._id == id))
    this.mostrarEditar = true
  }
  actualizarDistribuidor(): void {
    this._service.actualizarDistribuidor(this.distribuidor, this.distribuidor._id)
      .subscribe((): void => { this.obtenerDistribuidores() })
  }
  cancelar(): void {
    this.obtenerDistribuidores()
  }
  obtenerDistribuidores(): void {
    this.mostrarEditar = false
    this.mostrarAgregar = false
    this._service.obtenerDistribuidores()
      .subscribe((data) => this.distribuidores = data)
  }
  abrirAgregar(): void {
    this.distribuidor = { _id: '', vendedor: '', telefono: '', direccion: '', localidad: '' }
    this.mostrarAgregar = true
  }
  agregarDistribuidor(): void {
    this._service.agregarDistribuidor({
      vendedor: this.distribuidor.vendedor, telefono: this.distribuidor.telefono,
      direccion: this.distribuidor.direccion, localidad: this.distribuidor.localidad
    })
      .subscribe((): void => { this.obtenerDistribuidores() })
  }
  eliminarDistribuidor(id: string) {
    this._service.eliminarDistribuidor(id)
      .subscribe((): void => { this.obtenerDistribuidores() })
  }
}
