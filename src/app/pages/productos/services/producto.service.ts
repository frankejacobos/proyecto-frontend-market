import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../../categorias/components/Categoria';
import { Producto } from '../components/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}
  obtenerProductos() {
    return this.http.get<Producto[]>(environment.API_URL + '/productos');
  }
  obtenerProducto(id: string) {
    return this.http.get<Producto>(environment.API_URL + '/productos/' + id);
  }
  agregarProducto(data: Producto) {
    let temp = this.eliminarIdDeProducto(data);
    return this.http.post<Producto>(environment.API_URL + '/productos', temp);
  }
  actualizarProducto(data: Producto) {
    let id = data._id;
    let temp = this.eliminarIdDeProducto(data);
    return this.http.put<Producto>(
      environment.API_URL + '/productos/' + id,
      temp
    );
  }
  eliminarProducto(id: string) {
    return this.http.delete<Producto>(environment.API_URL + '/productos/' + id);
  }
  eliminarIdDeProducto(data: Producto) {
    return {
      descripcion: data.descripcion,
      unidad: data.unidad,
      codigo: data.codigo,
      precio_compra: data.precio_compra,
      precio_venta: data.precio_venta,
      stock_almacen: data.stock_almacen,
      categoria: data.categoria._id,
    };
  }
}
