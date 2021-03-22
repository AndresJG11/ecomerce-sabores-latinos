import { productoCarrito } from 'models';
import ActionUtility from 'utilities/ActionUtility';

export default class CarritoAction {

  // static AGREGAR_PRODUCTO = 'CarritoAction.ADD_PRODUCTO';
  static ACTUALIZAR_PRODUCTOS = 'CarritoAction.ACTUALIZAR_PRODUCTOS';

  // static agregarProducto(producto : productoCarrito) {
  //   return ActionUtility.createAction(CarritoAction.AGREGAR_PRODUCTO, producto);
  // }

  static actualizarProductos(productos : Array<productoCarrito>) {
    return ActionUtility.createAction(CarritoAction.ACTUALIZAR_PRODUCTOS, productos);
  }

}