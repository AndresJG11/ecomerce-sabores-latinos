import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import CategoriasEffect from './categoriasEffect';

export default class CategoriasAction {

  static REQUEST_CATEGORIAS_HOME = 'CategoriasAction.REQUEST_CATEGORIAS_HOME';
  static REQUEST_CATEGORIAS_HOME_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_HOME_FINISHED';

  static REQUEST_CATEGORIAS_LISTA = 'CategoriasAction.REQUEST_CATEGORIAS_LISTA';
  static REQUEST_CATEGORIAS_LISTA_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_LISTA_FINISHED';
  
  static REQUEST_CATEGORIAS_SAVE = 'CategoriasAction.REQUEST_CATEGORIAS_SAVE';
  static REQUEST_CATEGORIAS_SAVE_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_SAVE_FINISHED';
  
  static REQUEST_CATEGORIAS_DELETE = 'CategoriasAction.REQUEST_CATEGORIAS_DELETE';
  static REQUEST_CATEGORIAS_DELETE_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_DELETE_FINISHED';

  static requestCategoriasHome() {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_HOME, CategoriasEffect.requestCategoriasHome);
    };
  }

  static requestCategoriasLista() {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_LISTA, CategoriasEffect.requestCategoriasLista);
    };
  }

  static requestAgregarCategoria(formData : FormData) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_SAVE, CategoriasEffect.requestAgregarCategoria, formData);
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_HOME, CategoriasEffect.requestCategoriasHome);
    };
  }

  static requestDeleteCategoria(id : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_DELETE, CategoriasEffect.requestEliminarCategoria, id);
      await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS_HOME, CategoriasEffect.requestCategoriasHome);
    };
  }

}