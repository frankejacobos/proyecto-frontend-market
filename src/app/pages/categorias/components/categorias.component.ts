import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from './Categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoria: Categoria = { _id: '', nombre: '', codigo: '' };
  mostrarEditar: boolean = false;
  mostrarAgregar: boolean = false;
  constructor(
    private categoriaService: CategoriaService,
    private loginService: LoginService,
    private router: Router
  ) {
    if (!this.loginService.existeToken()) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    this.obtenerCategorias();
  }
  obtenerCategorias(): void {
    this.mostrarEditar = false;
    this.mostrarAgregar = false;
    this.categoriaService
      .obtenerCategorias()
      .subscribe((data) => (this.categorias = data));
  }
  abrirFormulario(id?: string): void {
    if (id) {
      this.categoriaService.obtenerCategoria(id).subscribe((data) => {
        this.categoria = data;
        this.mostrarEditar = true;
      });
    } else {
      this.categoria = { _id: '', nombre: '', codigo: '' };
      this.mostrarAgregar = true;
    }
  }
  actualizarCategoria(): void {
    this.categoriaService
      .actualizarCategoria(this.categoria)
      .subscribe((): void => {
        this.obtenerCategorias();
      });
  }
  agregarCategoria(): void {
    this.categoriaService
      .agregarCategoria(this.categoria)
      .subscribe((): void => {
        this.obtenerCategorias();
      });
  }
  eliminarCategoria(id?: string): void {
    if (id) {
      this.categoriaService.eliminarCategoria(id).subscribe((): void => {
        this.obtenerCategorias();
      });
    }
  }
}
