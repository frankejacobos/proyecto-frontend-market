import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './pages/inicio/components/inicio.component';
import { ProductosComponent } from './pages/productos/components/productos.component';
import { CategoriasComponent } from './pages/categorias/components/categorias.component';
import { ClienteComponent } from './pages/cliente/components/cliente.component';
import { DistribuidoresComponent } from './pages/distribuidores/components/distribuidores.component';
import { ComprasComponent } from './pages/compras/components/compras.component';
import { VentasComponent } from './pages/ventas/components/ventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptors';
import { LoginComponent } from './pages/login/components/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ProductosComponent,
    CategoriasComponent,
    ClienteComponent,
    DistribuidoresComponent,
    ComprasComponent,
    VentasComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
