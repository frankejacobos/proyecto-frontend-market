import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  items = [
    { nombre: 'cliente', icon: 'person' },
    { nombre: 'distribuidores', icon: 'local_shipping' },
    { nombre: 'categorias', icon: 'category' },
    { nombre: 'productos', icon: 'inventory' },
    { nombre: 'compras', icon: 'shopping_cart' },
    { nombre: 'ventas', icon: 'paid' },
  ]
  ngOnInit(): void {
  }

}
