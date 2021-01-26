import { ActualizarProducto } from 'models/Products/ActualizarProducto';
import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import { ProductosEffect } from './productosEffect';

export default class ProductosAction {

  static REQUEST_OBTENER_PRODUCTOS = 'ProductosAction.REQUEST_OBTENER_PRODUCTOS';
  static REQUEST_OBTENER_PRODUCTOS_FINISHED = 'ProductosAction.REQUEST_OBTENER_PRODUCTOS_FINISHED';
  
  static REQUEST_ACTUALIZAR_PRODUCTOS = 'ProductosAction.REQUEST_ACTUALIZAR_PRODUCTOS';
  static REQUEST_ACTUALIZAR_PRODUCTOS_FINISHED = 'ProductosAction.REQUEST_ACTUALIZAR_PRODUCTOS_FINISHED';

  static requestProductos(idCategoria : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTOS, ProductosEffect.requestObtenerProductos, idCategoria);
    };
  }
  
  static requestActualizarProducto(actualizarProducto : ActualizarProducto, idCategoria : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_ACTUALIZAR_PRODUCTOS, ProductosEffect.requestActualizarProducto, actualizarProducto);
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTOS, ProductosEffect.requestObtenerProductos, idCategoria);
    };
  }

}