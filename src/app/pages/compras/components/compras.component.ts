import { Component, OnInit } from '@angular/core';
import { CompraService } from '../services/compra.service';

interface Item { productoId: string; cantidad: number; precio_compra: number; precio_venta: number; unidad: string; }
interface Producto { _id: string; descripcion: string; unidad: string; codigo: string; precio_unitario: number; stock_almacen: number; categoria: { nombre: string; } }
interface Compra { _id: string; items: Array<Item>; distribuidor: { vendedor: string; }; cliente: { nombre_de_persona: string; }; fecha: Date; importe: number; }

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  constructor(private _service: CompraService) { }
  compras: Compra[] = []
  productos: Producto[] = []
  ngOnInit(): void {
    this._service.obtenerCompras()
      .subscribe((data) => {
        this.compras = data
        this._service.obtenerProductos()
          .subscribe((data) => {
            this.productos = data
            for (let compra of this.compras) {
              for (let i of compra.items) {
                const prod = this.productos.find((p) => p._id == i.productoId)
                i.productoId = String(prod?.descripcion)
                i.unidad = String(prod?.unidad)
              }
            }
          })
      })
  }

}
