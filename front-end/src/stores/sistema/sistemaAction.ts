import { Sistema } from 'models/System';
import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import { SistemaEffect } from './sistemaEffect';

export default class SistemaAction {

  static REQUEST_ACTUALIZAR_SISTEMA = 'SistemaAction.REQUEST_ACTUALIZAR_SISTEMA';
  static REQUEST_ACTUALIZAR_SISTEMA_FINISHED = 'SistemaAction.REQUEST_ACTUALIZAR_SISTEMA_FINISHED';

  static REQUEST_OBTENER_SISTEMA = 'SistemaAction.REQUEST_OBTENER_SISTEMA';
  static REQUEST_OBTENER_SISTEMA_FINISHED = 'SistemaAction.REQUEST_OBTENER_SISTEMA_FINISHED';

  static requestActualizarSistema(actualizarSistema : Sistema) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, SistemaAction.REQUEST_ACTUALIZAR_SISTEMA, SistemaEffect.requestActualizarSistema, actualizarSistema);
    };
  }

  static requestObtenerSistema() {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, SistemaAction.REQUEST_OBTENER_SISTEMA, SistemaEffect.requestObtenerSistema);
    };
  }

}