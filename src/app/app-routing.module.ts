import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/components/categorias.component';
import { ClienteComponent } from './pages/cliente/components/cliente.component';
import { ComprasComponent } from './pages/compras/components/compras.component';
import { DistribuidoresComponent } from './pages/distribuidores/components/distribuidores.component';
import { InicioComponent } from './pages/inicio/components/inicio.component';
import { ProductosComponent } from './pages/productos/components/productos.component';
import { VentasComponent } from './pages/ventas/components/ventas.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'distribuidores', component: DistribuidoresComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'ventas', component: VentasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
