import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  obtenerClientes() { return this.http.get<any>(environment.API_URL + '/clientes') }
  actualizarCliente(data: any, id: string) { return this.http.put<any>(environment.API_URL + '/clientes/' + id, data) }
}
