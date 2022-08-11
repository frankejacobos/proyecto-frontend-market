import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../components/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}
  obtenerCategorias() {
    return this.http.get<Categoria[]>(environment.API_URL + '/categorias');
  }
  obtenerCategoria(id: string) {
    return this.http.get<Categoria>(environment.API_URL + '/categorias/' + id);
  }
  agregarCategoria(data: Categoria) {
    data = this.eliminarIdDeCategoria(data);
    return this.http.post<Categoria>(environment.API_URL + '/categorias', data);
  }
  actualizarCategoria(data: Categoria) {
    let id = data._id;
    data = this.eliminarIdDeCategoria(data);
    return this.http.put<Categoria>(
      environment.API_URL + '/categorias/' + id,
      data
    );
  }
  eliminarCategoria(id: string) {
    return this.http.delete<Categoria>(
      environment.API_URL + '/categorias/' + id
    );
  }
  eliminarIdDeCategoria(data: Categoria) {
    return {
      nombre: data.nombre,
      codigo: data.codigo,
    };
  }
}
