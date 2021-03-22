import CarritoAction from "./carritoAction";

export class CarritoReducer {

    static initialState = {
        productosCarrito: []
    };
  
    static reducer(state = CarritoReducer.initialState, action : any) {

      if (action.error) {
        return state;
      }
  
      switch (action.type) {

        // case CarritoAction.AGREGAR_PRODUCTO:
        //   return {
        //     ...state,
        //     productosCarrito: action.payload,
        //   };

        case CarritoAction.ACTUALIZAR_PRODUCTOS:
          return {
            ...state,
            productosCarrito: action.payload
          };


        default:
          return state;
      }
    }
  }