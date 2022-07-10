import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }
  obtenerCompras() { return this.http.get<any>(environment.API_URL + '/compras') }
  obtenerProductos() { return this.http.get<any>(environment.API_URL + '/productos') }
}
