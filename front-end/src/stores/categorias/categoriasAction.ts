import {Dispatch} from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import CategoriasEffect from './categoriasEffect';

export default class CategoriasAction  {

    static REQUEST_CATEGORIAS = 'CategoriasAction.REQUEST_CATEGORIAS';
    static REQUEST_CATEGORIAS_FINISHED = 'CategoriasAction.REQUEST_CATEGORIAS_FINISHED';

    static requestCategorias() {
        return async (dispatch : Dispatch, getState : any) => {
          await ActionUtility.createThunkEffect(dispatch, CategoriasAction.REQUEST_CATEGORIAS, CategoriasEffect.requestCategorias);
        };
      }
  
  }