import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../components/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}
  obtenerClientes() {
    return this.http.get<Cliente[]>(environment.API_URL + '/clientes');
  }
  obtenerCliente(id: string) {
    return this.http.get<Cliente>(environment.API_URL + '/clientes/' + id);
  }
  agregarCliente(data: Cliente) {
    data = this.eliminarIdDeCliente(data);
    return this.http.post<Cliente>(environment.API_URL + '/clientes', data);
  }
  actualizarCliente(data: Cliente) {
    let id = data._id;
    data = this.eliminarIdDeCliente(data);
    return this.http.put<Cliente>(
      environment.API_URL + '/clientes/' + id,
      data
    );
  }
  eliminarCliente(id: string) {
    return this.http.delete<Cliente>(environment.API_URL + '/clientes/' + id);
  }
  eliminarIdDeCliente(data: Cliente) {
    return {
      nombre_de_persona: data.nombre_de_persona,
      tipo_de_persona: data.tipo_de_persona,
      tipo_de_documento: data.tipo_de_documento,
      numero_de_documento: data.numero_de_documento,
      direccion: data.direccion,
      localidad: data.localidad,
      correo: data.correo,
      telefono: data.telefono,
    };
  }
}
