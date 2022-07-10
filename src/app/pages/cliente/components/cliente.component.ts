import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';

interface Cliente {
  _id: string, correo: string, direccion: string, localidad: string, nombre_de_persona: string,
  numero_de_documento: number, telefono: string, tipo_de_documento: string, tipo_de_persona: string,
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  constructor(private _service: ClienteService) { }
  tipo_documento = ['ruc', 'dni']
  tipo_persona = ['natural', 'juridica']
  clientes: Cliente[] = []
  cliente: Cliente = {
    _id: '', nombre_de_persona: '', tipo_de_persona: '', tipo_de_documento: '',
    numero_de_documento: 0, direccion: '', localidad: '', correo: '', telefono: '',
  }
  mostrarEditar: boolean = false
  ngOnInit(): void {
    this.obtenerClientes()
  }
  editar(id: string): void {
    this._service.obtenerClientes()
      .subscribe((data) => this.cliente = data.find((p: { _id: string; }) => p._id == id))
    this.mostrarEditar = true
  }
  actualizar(): void {
    this._service.actualizarCliente(this.cliente, this.cliente._id)
      .subscribe((): void => { this.obtenerClientes() })
  }
  cancelar(): void { this.obtenerClientes() }
  obtenerClientes(): void {
    this.mostrarEditar = false
    this._service.obtenerClientes()
      .subscribe((data) => this.clientes = data)
  }
}
