import { Categoria } from '../../categorias/components/Categoria';

export interface Producto {
  _id?: string;
  descripcion: string;
  unidad: string;
  codigo: string;
  precio_compra: number;
  precio_venta: number;
  stock_almacen: number;
  categoria: Categoria;
}
