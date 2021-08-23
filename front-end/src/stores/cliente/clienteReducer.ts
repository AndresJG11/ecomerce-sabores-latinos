import ClienteAction from "./clienteAction";

export class ClienteReducer {
    static initialState = {
        cliente: null,
    };

    static reducer(state = ClienteReducer.initialState, action: any) {

        if (action.error) {
            return state;
        }

        switch (action.type) {
            case ClienteAction.REQUEST_OBTENER_CLIENTE_POR_ID_FINISHED:
                return {
                    ...state,
                    cliente: action.payload,
                };

            default:
                return state;
        }
    }
}