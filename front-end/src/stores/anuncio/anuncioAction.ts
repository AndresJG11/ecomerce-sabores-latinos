import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import AnuncioEffect  from './anuncioEffect'

export default class AnuncioAction {

  static REQUEST_OBTENER_ANUNCIOS = 'AnuncioAction.REQUEST_OBTENER_ANUNCIOS';
  static REQUEST_OBTENER_ANUNCIOS_FINISHED = 'AnuncioAction.REQUEST_OBTENER_ANUNCIOS_FINISHED';

  static REQUEST_AGREGAR_ANUNCIO = 'AnuncioAction.REQUEST_AGREGAR_ANUNCIO';
  static REQUEST_AGREGAR_ANUNCIO_FINISHED = 'AnuncioAction.REQUEST_AGREGAR_ANUNCIO_FINISHED';

  static REQUEST_ACTUALIZAR_ANUNCIO = 'AnuncioAction.REQUEST_ACTUALIZAR_ANUNCIO';
  static REQUEST_ACTUALIZAR_ANUNCIO_FINISHED = 'AnuncioAction.REQUEST_ACTUALIZAR_ANUNCIO_FINISHED';

  static REQUEST_ACTUALIZAR_IMAGEN_ANUNCIO = 'AnuncioAction.REQUEST_ACTUALIZAR_IMAGEN_ANUNCIO';
  static REQUEST_ACTUALIZAR_IMAGEN_ANUNCIO_FINISHED = 'AnuncioAction.REQUEST_ACTUALIZAR_IMAGEN_ANUNCIO_FINISHED';

  static REQUEST_ELIMINAR_ANUNCIO = 'AnuncioAction.REQUEST_ELIMINAR_ANUNCIO';
  static REQUEST_ELIMINAR_ANUNCIO_FINISHED = 'AnuncioAction.REQUEST_ELIMINAR_ANUNCIO_FINISHED';


  static requestObtenerAnuncios() {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_OBTENER_ANUNCIOS, AnuncioEffect.requestObtenerAnuncios);
    };
  }
  
  static requestAgregarAnuncio(data : {imagen: string, enlace : string, titulo : string}) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_AGREGAR_ANUNCIO, AnuncioEffect.requestAgregarAnuncio, data);
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_OBTENER_ANUNCIOS, AnuncioEffect.requestObtenerAnuncios);
    };
  }

  static requestEliminarAnuncio(id : number) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_ELIMINAR_ANUNCIO, AnuncioEffect.requestEliminarAnuncio, id);
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_OBTENER_ANUNCIOS, AnuncioEffect.requestObtenerAnuncios);
    };
  }

  static requestActualizarAnuncio(data : {id: number, enlace : string, titulo : string, imagen : string}) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_ACTUALIZAR_ANUNCIO, AnuncioEffect.requestActualizarAnuncio, data);
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_OBTENER_ANUNCIOS, AnuncioEffect.requestObtenerAnuncios);
    };
  }

  static requestActualizarImagenAnuncio(data : {id: number, formData : FormData}) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_ACTUALIZAR_IMAGEN_ANUNCIO, AnuncioEffect.requestActualizarImagenAnuncio, data);
      await ActionUtility.createThunkEffect(dispatch, AnuncioAction.REQUEST_OBTENER_ANUNCIOS, AnuncioEffect.requestObtenerAnuncios);
    };
  }

}