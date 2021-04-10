import { productoCarrito } from 'models';
import { DetallesVenta } from 'models/Ventas/VentasTypes';
import { Dispatch } from 'redux';
import ActionUtility from 'utilities/ActionUtility';
import CarritoEffect from './carritoEffect'

export default class CarritoAction {

  // static AGREGAR_PRODUCTO = 'CarritoAction.ADD_PRODUCTO';
  static ACTUALIZAR_PRODUCTOS = 'CarritoAction.ACTUALIZAR_PRODUCTOS';

  static REQUEST_AGREGAR_VENTA = 'CarritoAction.REQUEST_AGREGAR_VENTA';
  static REQUEST_AGREGAR_VENTA_FINISHED = 'CarritoAction.REQUEST_AGREGAR_VENTA_FINISHED';

  // static agregarProducto(producto : productoCarrito) {
  //   return ActionUtility.createAction(CarritoAction.AGREGAR_PRODUCTO, producto);
  // }

  static actualizarProductos(productos : Array<productoCarrito>) {
    return ActionUtility.createAction(CarritoAction.ACTUALIZAR_PRODUCTOS, productos);
  }

  static requestAgregarVenta( detallesVenta : DetallesVenta ){
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, CarritoAction.REQUEST_AGREGAR_VENTA, CarritoEffect.requestAgregarVenta, detallesVenta);
    };
  }

}