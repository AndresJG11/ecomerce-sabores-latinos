import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import CategoriasEffect from './categoriasEffect';

export default class CategoriasAction {

  static REQUEST_CATEGORIAS_HOME = 'CategoriasAction.REQUEST_CATEGORIAS_HOME';
  static REQUEST_CATEGORIAS_HOME_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_HOME_FINISHED';

  static REQUEST_CATEGORIAS_LISTA = 'CategoriasAction.REQUEST_CATEGORIAS_LISTA';
  static REQUEST_CATEGORIAS_LISTA_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_LISTA_FINISHED';
  
  static REQUEST_CATEGORIAS_PAGINADAS = 'CategoriasAction.REQUEST_CATEGORIAS_PAGINADAS';
  static REQUEST_CATEGORIAS_PAGINADAS_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_PAGINADAS_FINISHED';
  
  static REQUEST_CATEGORIAS_SAVE = 'CategoriasAction.REQUEST_CATEGORIAS_SAVE';
  static REQUEST_CATEGORIAS_SAVE_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_SAVE_FINISHED';
  
  static REQUEST_CATEGORIAS_DELETE = 'CategoriasAction.REQUEST_CATEGORIAS_DELETE';
  static REQUEST_CATEGORIAS_DELETE_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_DELETE_FINISHED';
  
  static REQUEST_CATEGORIAS_EDIT = 'CategoriasAction.REQUEST_CATEGORIAS_EDIT';
  static REQUEST_CATEGORIAS_EDIT_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_EDIT_FINISHED';

  static REQUEST_CATEGORIAS_ACTUALIZAR_IMAGEN = 'CategoriasAction.REQUEST_CATEGORIAS_ACTUALIZAR_IMAGEN';
  static REQUEST_CATEGORIAS_ACTUALIZAR_IMAGEN_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_ACTUALIZAR_IMAGEN_FINISHED';

  static requestCategoriasHome() {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_HOME, CategoriasEffect.requestCategoriasHome);
    };
  }

  static requestObtenerCategoriasPaginadas({actualPage, pageSize} : {actualPage : number, pageSize : number}) {
    return async (dispatch: Dispatch, getState: any) => {
      const args = {actualPage, pageSize}
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_PAGINADAS, CategoriasEffect.requestObtenerCategorias, args);
    };
  }

  static requestObtenerCategoriasLista() {
    return async (dispatch: Dispatch, getState: any) => {
      const args = {actualPage: null, pageSize: null}
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_LISTA, CategoriasEffect.requestObtenerCategorias, args);
    };
  }

  static requestAgregarCategoria(formData : FormData, nombre : string, {actualPage, pageSize} : {actualPage : number, pageSize : number}) {
    return async (dispatch: Dispatch, getState: any) => {
      const args = {formData, nombre}
      const pagination = {pageSize, actualPage}
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_SAVE, CategoriasEffect.requestAgregarCategoria, args);
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_LISTA, CategoriasEffect.requestObtenerCategorias, pagination);
    };
  }

  static requestActualizarCategoria(nombre : string, id : number, {actualPage, pageSize} : {actualPage : number, pageSize : number}) {
    return async (dispatch: Dispatch, getState: any) => {
      const args = {nombre, id}
      const pagination = {pageSize, actualPage}
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_EDIT, CategoriasEffect.requestActualizarCategoria, args);
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_LISTA, CategoriasEffect.requestObtenerCategorias, pagination);
    };
  }

  static requestActualizarCategoriaImagen(formData : FormData, id : number, {actualPage, pageSize} : {actualPage : number, pageSize : number}) {
    return async (dispatch: Dispatch, getState: any) => {
      const pagination = {pageSize, actualPage}
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_ACTUALIZAR_IMAGEN, CategoriasEffect.requestActualizarImagenCategoria, {formData, id});
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_LISTA, CategoriasEffect.requestObtenerCategorias, pagination);
    };
  }

  static requestDeleteCategoria(id : number, {actualPage, pageSize} : {actualPage : number, pageSize : number}) {
    return async (dispatch: Dispatch, getState: any) => {
      const pagination = {pageSize, actualPage}
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_DELETE, CategoriasEffect.requestEliminarCategoria, id);
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_LISTA, CategoriasEffect.requestObtenerCategorias, pagination);
    };
  }

}