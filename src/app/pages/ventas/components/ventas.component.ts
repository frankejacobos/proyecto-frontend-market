import { Component, OnInit } from '@angular/core';
import { VentaService } from '../services/venta.service';

interface Item { productoId: string; cantidad: number; precio: number; unidad: string; }
interface Producto { _id: string; descripcion: string; unidad: string; codigo: string; precio_venta: number; stock_almacen: number; categoria: { nombre: string; } }
interface Venta { _id: string; items: Array<Item>; fecha: Date; importe: number; }

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  constructor(private _service: VentaService) { }
  ventas: Venta[] = []
  productos: Producto[] = []
  ngOnInit(): void {
    this._service.obtenerVentas()
      .subscribe((data) => {
        this.ventas = data
        this._service.obtenerProductos()
          .subscribe((data) => {
            this.productos = data
            for (let venta of this.ventas) {
              for (let i of venta.items) {
                const prod = this.productos.find((p) => p._id == i.productoId)
                console.log(prod)
                i.productoId = String(prod?.descripcion)
                i.precio = Number(prod?.precio_venta)
                i.unidad = String(prod?.unidad)
              }
            }
          })
      })
  }

}
