import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../../categorias/components/Categoria';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { LoginService } from '../../login/services/login.service';
import { ProductoService } from '../services/producto.service';
import { Producto } from './Producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  categorias: Categoria[] = [];
  categoria: Categoria = { _id: '', nombre: '', codigo: '' };
  productos: Producto[] = [];
  producto: Producto = this.limpiarProducto();
  mostrarEditar: boolean = false;
  mostrarAgregar: boolean = false;
  constructor(
    private _serviceProducto: ProductoService,
    private _serviceCategoria: CategoriaService,
    private loginService: LoginService,
    private router: Router
  ) {
    if (!this.loginService.existeToken()) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    this.obtenerProductos();
  }
  obtenerProductos(): void {
    this.mostrarEditar = false;
    this.mostrarAgregar = false;
    this._serviceProducto
      .obtenerProductos()
      .subscribe((data) => (this.productos = data));
  }
  abrirFormulario(id?: string): void {
    this._serviceCategoria
      .obtenerCategorias()
      .subscribe((data) => (this.categorias = data));
    if (id) {
      this._serviceProducto
        .obtenerProducto(id)
        .subscribe((data) => (this.producto = data));
      this.mostrarEditar = true;
    } else {
      this.producto = this.limpiarProducto();
      this.mostrarAgregar = true;
    }
  }
  agregarProducto(): void {
    this._serviceProducto.agregarProducto(this.producto).subscribe((): void => {
      this.obtenerProductos();
    });
  }
  actualizarProducto(): void {
    this._serviceProducto
      .actualizarProducto(this.producto)
      .subscribe((): void => {
        this.obtenerProductos();
      });
  }
  eliminarProducto(id?: string): void {
    if (id) {
      this._serviceProducto.eliminarProducto(id).subscribe((): void => {
        this.obtenerProductos();
      });
    }
  }
  limpiarProducto(): Producto {
    return {
      _id: '',
      descripcion: '',
      unidad: 'uds',
      codigo: '',
      precio_compra: 0,
      precio_venta: 0,
      stock_almacen: 0,
      categoria: {
        _id: '',
        nombre: '',
        codigo: '',
      },
    };
  }
}
