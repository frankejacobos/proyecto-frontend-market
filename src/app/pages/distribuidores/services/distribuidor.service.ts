import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistribuidorService {

  constructor(private http: HttpClient) { }
  obtenerDistribuidores() { return this.http.get<any>(environment.API_URL + '/distribuidores') }
  agregarDistribuidor(data: any) { return this.http.post<any>(environment.API_URL + '/distribuidores', data) }
  actualizarDistribuidor(data: any, id: string) { return this.http.put<any>(environment.API_URL + '/distribuidores/' + id, data) }
  eliminarDistribuidor(id: string) { return this.http.delete<any>(environment.API_URL + '/distribuidores/' + id) }
}
