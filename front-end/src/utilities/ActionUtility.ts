import {Dispatch} from 'redux'
import AlertaAction from 'stores/alerta/alertaAction';

export default class ActionUtility {

    static createAction(type : string | number, payload : any = undefined, error = false, meta = null) {
      return { type, payload, error, meta };
    }

    static async createThunkEffect(dispatch : Dispatch, actionType : string | number, effect : Function, ...args : any) {
        dispatch(ActionUtility.createAction(actionType));
    
        const model = await effect(...args);

        //ToDo: Manejar errores HTTP
        const isError = !(model?.status >= 200 && model?.status <= 299)

        const isResponse = model instanceof Response;

        if(isResponse){
          const message =  await model.text()
          dispatch( AlertaAction.setAlerta( {show: true, message, variant: model.status === 200 ? 'success' : 'danger'} ) )
        } else if(isError){
          const message = "Ha ocurrido un error x_x"
          dispatch( AlertaAction.setAlerta( {show: true, message, variant: 'danger'} ) )
        }

        dispatch( ActionUtility.createAction(`${actionType}_FINISHED`, model, isError) );
    
        return model;
      }
  
  }