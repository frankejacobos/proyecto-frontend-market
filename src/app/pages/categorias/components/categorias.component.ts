import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';

interface Categoria { _id: string; nombre: string; codigo: string; }

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  constructor(private _service: CategoriaService) { }
  categorias: Categoria[] = []
  ngOnInit(): void {
    this._service.obtenerCategorias()
      .subscribe((data) => this.categorias = data)
  }

}
