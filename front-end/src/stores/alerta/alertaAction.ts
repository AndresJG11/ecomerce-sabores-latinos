import { AlertMessageType } from 'shared/alert-message/models';
import ActionUtility from 'utilities/ActionUtility';

export default class AlertaAction {

  static SET_ALERTA = 'AlertaAction.SET_ALERTA';

  static setAlerta( alerta : AlertMessageType ) {
      return ActionUtility.createAction(AlertaAction.SET_ALERTA, alerta);
  }
  

}