import SistemaAction from "./sistemaAction";

export class SistemaReducer {

    static initialState = {
        parametrosSistema: null
    };
  
    static reducer(state = SistemaReducer.initialState, action : any) {

      if (action.error) {
        return state;
      }
  
      switch (action.type) {

        case SistemaAction.REQUEST_ACTUALIZAR_SISTEMA_FINISHED:
          return {
            ...state,
            parametrosSistema: action.payload,
          };

        default:
          return state;

      }
    }
  }