import VentaAction from "./ventaAction"

export class VentaReducer {
    static initialState = {
        ventasPaginadas: null
    };

    static reducer(state = VentaReducer.initialState, action : any) {

        if (action.error) {
          return state;
        }

        switch (action.type) {

            case VentaAction.REQUEST_OBTENER_VENTAS_FINISHED:
              return {
                ...state,
                ventasPaginadas: action.payload,
              };

            default:
                return state;

        }

    }

}