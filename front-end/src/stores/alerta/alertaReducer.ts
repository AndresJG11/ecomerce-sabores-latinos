import { AlertMessageType } from "shared/alert-message/models";
import AlertaAction from "./alertaAction";

export class AlertaReducer {
    static initialState : AlertMessageType = {
        show : false,
        message : '',
    };
  
    static reducer(state = AlertaReducer.initialState, action : any) {

      if (action.error) {
        return state;
      }
  
      switch (action.type) {

        case AlertaAction.SET_ALERTA:
          return {
            ...state,
            ...action.payload
          };

        default:
          return state;
      }
    }
  }