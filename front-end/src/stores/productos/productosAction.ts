import { ProductoDto } from 'models/Products';
import { ActualizarProducto } from 'models/Products/ActualizarProducto';
import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import { ProductosEffect } from './productosEffect';

export default class ProductosAction {

  static REQUEST_OBTENER_PRODUCTO = 'ProductosAction.REQUEST_OBTENER_PRODUCTO';
  static REQUEST_OBTENER_PRODUCTO_FINISHED = 'ProductosAction.REQUEST_OBTENER_PRODUCTO_FINISHED';

  static REQUEST_OBTENER_PRODUCTOS = 'ProductosAction.REQUEST_OBTENER_PRODUCTOS';
  static REQUEST_OBTENER_PRODUCTOS_FINISHED = 'ProductosAction.REQUEST_OBTENER_PRODUCTOS_FINISHED';
  
  static REQUEST_ACTUALIZAR_PRODUCTOS = 'ProductosAction.REQUEST_ACTUALIZAR_PRODUCTOS';
  static REQUEST_ACTUALIZAR_PRODUCTOS_FINISHED = 'ProductosAction.REQUEST_ACTUALIZAR_PRODUCTOS_FINISHED';

  static REQUEST_AGREGAR_PRODUCTOS = 'ProductosAction.REQUEST_AGREGAR_PRODUCTOS';
  static REQUEST_AGREGAR_PRODUCTOS_FINISHED = 'ProductosAction.REQUEST_AGREGAR_PRODUCTOS_FINISHED';

  static REQUEST_AGREGAR_IMAGEN_PRODUCTO = 'ProductosAction.REQUEST_AGREGAR_IMAGEN_PRODUCTO';
  static REQUEST_AGREGAR_IMAGEN_PRODUCTO_FINISHED = 'ProductosAction.REQUEST_AGREGAR_IMAGEN_PRODUCTO_FINISHED';

  static REQUEST_ELIMINAR_IMAGEN_PRODUCTO = 'ProductosAction.REQUEST_ELIMINAR_IMAGEN_PRODUCTO';
  static REQUEST_ELIMINAR_IMAGEN_PRODUCTO_FINISHED = 'ProductosAction.REQUEST_ELIMINAR_IMAGEN_PRODUCTO_FINISHED';

  static REQUEST_ELIMINAR_PRODUCTO = 'ProductosAction.REQUEST_ELIMINAR_PRODUCTO';
  static REQUEST_ELIMINAR_PRODUCTO_FINISHED = 'ProductosAction.REQUEST_ELIMINAR_PRODUCTO_FINISHED';

  static SET_EDITAR_PRODUCTO = 'ProductosAction.SET_EDITAR_PRODUCTO';

  static requestObtenerProducto(idProducto : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTO, ProductosEffect.requestObtenerProducto, idProducto);
    };
  }

  static requestProductos(idCategoria : number, pageSize : number | null = null, actualPage : number | null = null) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTOS, ProductosEffect.requestObtenerProductos, {idCategoria, pageSize, actualPage});
    };
  }
  
  static requestActualizarProducto(actualizarProducto : ActualizarProducto, idCategoria : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_ACTUALIZAR_PRODUCTOS, ProductosEffect.requestActualizarProducto, actualizarProducto);
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTOS, ProductosEffect.requestObtenerProductos, idCategoria);
    };
  }
  
  static requestAgregarProducto(agregarProducto : ActualizarProducto, idCategoria : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_AGREGAR_PRODUCTOS, ProductosEffect.requestAgregarProducto, agregarProducto);
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTOS, ProductosEffect.requestObtenerProductos, idCategoria);
    };
  }

  static requestAgregarImagenProducto(formData : FormData, idProducto : number) {
    return async (dispatch: Dispatch, getState: any) => {
      const args = {formData, idProducto}
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_AGREGAR_IMAGEN_PRODUCTO, ProductosEffect.requestAgregarImagenProducto, args);
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTO, ProductosEffect.requestObtenerProducto, idProducto);
    };
  }
  
  static requestEliminarImagenProducto(idImagen : number, idProducto : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_ELIMINAR_IMAGEN_PRODUCTO, ProductosEffect.requestEliminarImagenProducto, idImagen);
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTO, ProductosEffect.requestObtenerProducto, idProducto);
    };
  }

  static requestEliminarProducto(idProducto : number, idCategoria : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_ELIMINAR_PRODUCTO, ProductosEffect.requestEliminarProducto, idProducto);
      await ActionUtility.createThunkEffect(dispatch, ProductosAction.REQUEST_OBTENER_PRODUCTOS, ProductosEffect.requestObtenerProductos, idCategoria);
    };
  }

  static setEditarProducto(producto : ProductoDto | null) {
    return ActionUtility.createAction(ProductosAction.SET_EDITAR_PRODUCTO, producto);
  }

}