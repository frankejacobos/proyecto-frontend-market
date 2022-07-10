import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }
  obtenerVentas() { return this.http.get<any>(environment.API_URL + '/ventas') }
  obtenerProductos() { return this.http.get<any>(environment.API_URL + '/productos') }
}
