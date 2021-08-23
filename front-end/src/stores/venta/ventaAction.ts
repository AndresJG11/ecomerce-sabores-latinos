import { Dispatch } from 'redux'
import ActionUtility from 'utilities/ActionUtility';
import VentaEffect from './ventaEffect';

export default class VentaAction {
    static REQUEST_OBTENER_VENTAS = 'VentaAction.REQUEST_OBTENER_VENTAS';
    static REQUEST_OBTENER_VENTAS_FINISHED = 'VentaAction.REQUEST_OBTENER_VENTAS_FINISHED';
    
    static REQUEST_CERRAR_VENTA = 'VentaAction.REQUEST_CERRAR_VENTA';
    static REQUEST_CERRAR_VENTA_FINISHED = 'VentaAction.REQUEST_CERRAR_VENTA_FINISHED';

    static requestVentas(args:{actualPage: number, estado: number, pageSize: number}) {
        return async (dispatch: Dispatch, getState: any) => {
          await ActionUtility.createThunkEffect(dispatch, VentaAction.REQUEST_OBTENER_VENTAS, VentaEffect.requestObtenerVentas, args);
        };
      }
      
      static requestCerrarVenta(args:{idVenta?: number, actualPage: number, estado: number, pageSize: number}) {
        return async (dispatch: Dispatch, getState: any) => {
          const idVenta = {idVenta: args.idVenta}
          delete args.idVenta
          await ActionUtility.createThunkEffect(dispatch, VentaAction.REQUEST_CERRAR_VENTA, VentaEffect.requestCerrarVenta, idVenta);
          await ActionUtility.createThunkEffect(dispatch, VentaAction.REQUEST_OBTENER_VENTAS, VentaEffect.requestObtenerVentas, args);
          
        };
      }
}