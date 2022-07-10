import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

interface Producto {
  _id: string; descripcion: string; unidad: string; codigo: string;
  precio_unitario: number; stock_almacen: number; categoria: { nombre: string; }
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  constructor(private _service: ProductoService) { }
  productos: Producto[] = []
  ngOnInit(): void {
    this._service.obtenerProductos()
      .subscribe((data) => this.productos = data)
  }

}
