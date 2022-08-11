import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Distribuidor } from '../components/Distribuidor';

@Injectable({
  providedIn: 'root',
})
export class DistribuidorService {
  constructor(private http: HttpClient) {}
  obtenerDistribuidores() {
    return this.http.get<Distribuidor[]>(
      environment.API_URL + '/distribuidores'
    );
  }
  obtenerDistribuidor(id: string) {
    return this.http.get<Distribuidor>(
      environment.API_URL + '/distribuidores/' + id
    );
  }
  agregarDistribuidor(data: Distribuidor) {
    data = this.eliminarIdDeDistribuidor(data);
    return this.http.post<Distribuidor>(
      environment.API_URL + '/distribuidores',
      data
    );
  }
  actualizarDistribuidor(data: Distribuidor) {
    let id = data._id;
    data = this.eliminarIdDeDistribuidor(data);
    return this.http.put<Distribuidor>(
      environment.API_URL + '/distribuidores/' + id,
      data
    );
  }
  eliminarDistribuidor(id: string) {
    return this.http.delete<Distribuidor>(
      environment.API_URL + '/distribuidores/' + id
    );
  }
  eliminarIdDeDistribuidor(data: Distribuidor) {
    return {
      vendedor: data.vendedor,
      telefono: data.telefono,
      direccion: data.direccion,
      localidad: data.localidad,
    };
  }
}
