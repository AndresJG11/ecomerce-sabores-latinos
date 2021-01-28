import { ActualizarSistema } from 'models/System';
import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import { SistemaEffect } from './sistemaEffect';

export default class SistemaAction {

  static REQUEST_ACTUALIZAR_SISTEMA = 'ProductosAction.REQUEST_ACTUALIZAR_SISTEMA';
  static REQUEST_ACTUALIZAR_SISTEMA_FINISHED = 'ProductosAction.REQUEST_ACTUALIZAR_SISTEMA_FINISHED';

  static requestActualizarSistema(actualizarSistema : ActualizarSistema) {
    return async (dispatch: Dispatch, getState: any) => {
      await ActionUtility.createThunkEffect(dispatch, SistemaAction.REQUEST_ACTUALIZAR_SISTEMA, SistemaEffect.requestActualizarProducto, actualizarSistema);
    };
  }

}