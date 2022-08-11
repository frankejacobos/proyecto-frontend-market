import { Producto } from '../../productos/components/Producto';

export interface Venta {
  _id: string;
  items: Array<ItemCarrito>;
  fecha: Date;
  importe: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
