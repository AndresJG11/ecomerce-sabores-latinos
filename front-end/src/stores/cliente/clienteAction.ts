import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import ClienteEffect from './clienteEffect';

export default class ClienteAction {

    static REQUEST_OBTENER_CLIENTE_POR_ID = 'ClienteAction.REQUEST_OBTENER_CLIENTE_POR_ID';
    static REQUEST_OBTENER_CLIENTE_POR_ID_FINISHED = 'ClienteAction.REQUEST_OBTENER_CLIENTE_POR_ID_FINISHED';

    static requestObtenerClientePorId(args:{id: number}) {
        return async (dispatch: Dispatch, getState: any) => {
            await ActionUtility.createThunkEffect(dispatch, ClienteAction.REQUEST_OBTENER_CLIENTE_POR_ID, ClienteEffect.requestObtenerClientePorId, args);
        };
    }

}