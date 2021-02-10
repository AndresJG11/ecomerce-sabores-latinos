import {Dispatch} from 'redux'

export default class ActionUtility {

    static createAction(type : string | number, payload : any = undefined, error = false, meta = null) {
      return { type, payload, error, meta };
    }

    static async createThunkEffect(dispatch : Dispatch, actionType : string | number, effect : Function, ...args : any) {
        dispatch(ActionUtility.createAction(actionType));
    
        const model = await effect(...args);
        // const isError = model instanceof HttpErrorResponse;
        const isError = false
    
        dispatch(ActionUtility.createAction(`${actionType}_FINISHED`, model, isError));
    
        return model;
      }
  
  }