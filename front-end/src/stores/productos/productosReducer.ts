import ProductosAction from "./productosAction";

export class ProductosReducer {

    static initialState = {
        productosPorCategoria:null
    };
  
    static reducer(state = ProductosReducer.initialState, action : any) {

      if (action.error) {
        return state;
      }
  
      switch (action.type) {

        case ProductosAction.REQUEST_OBTENER_PRODUCTOS_FINISHED:
          return {
            ...state,
            productosPorCategoria: action.payload,
          };

        default:
          return state;

      }
    }
  }