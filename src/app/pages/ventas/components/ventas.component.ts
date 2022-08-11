import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { Producto } from '../../productos/components/Producto';
import { ProductoService } from '../../productos/services/producto.service';
import { VentaService } from '../services/venta.service';
import { Venta, ItemCarrito } from './Item';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  item: any = { producto: { _id: '' } };
  ventas: Venta[] = [];
  carrito: ItemCarrito[] = [];
  productos: Producto[] = [];
  mostrarAgregar: boolean = false;
  constructor(
    private _ventaService: VentaService,
    private _productoService: ProductoService,
    private loginService: LoginService,
    private router: Router
  ) {
    if (!this.loginService.existeToken()) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    this.obtenerVentas();
  }
  obtenerVentas() {
    this._ventaService.obtenerVentas().subscribe((data) => {
      this.ventas = data;
    });
    this.mostrarAgregar = false;
  }
  obtenerProductos() {
    this._productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    });
  }
  abrirAgregar(): void {
    this.obtenerProductos();
    this.carrito = [];
    this.mostrarAgregar = true;
  }
  insertarVenta(): void {
    let itemsTransformados = this.carrito.map((item) => {
      return { producto: item.producto._id, cantidad: item.cantidad };
    });
    this._ventaService
      .insertarVenta({ items: itemsTransformados })
      .subscribe(() => {
        this.obtenerVentas();
      });
  }
  insertarProductoEnCarrito(): void {
    if (this.carrito.find((i) => i.producto._id === this.item.producto._id)) {
      this.carrito = this.carrito.filter((item) => {
        return item.producto._id !== this.item.producto._id;
      });
    }
    this.item.producto = this.productos.find((producto) => {
      return producto._id === this.item.producto._id;
    });
    this.carrito.push(this.item);
    this.item = { producto: { _id: '' } };
  }
  obtenerImporte(): number {
    return this.carrito.reduce((acc, item) => {
      return acc + item.producto.precio_venta * item.cantidad;
    }, 0);
  }
  calcularTotalVentas(): number {
    return this.ventas.reduce((acc, venta) => {
      return acc + venta.importe;
    }, 0);
  }
}
