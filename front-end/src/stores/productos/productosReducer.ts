import ProductosAction from "./productosAction";

export class ProductosReducer {

    static initialState = {
        productosPorCategoria:null,
        editarProducto: null
    };
  
    static reducer(state = ProductosReducer.initialState, action : any) {

      if (action.error) {
        return state;
      }
  
      switch (action.type) {

        case ProductosAction.SET_EDITAR_PRODUCTO:
          return {
            ...state,
            editarProducto: action.payload,
          };

        case ProductosAction.REQUEST_OBTENER_PRODUCTOS_FINISHED:
          return {
            ...state,
            productosPorCategoria: action.payload,
          };

        case ProductosAction.REQUEST_OBTENER_PRODUCTO_FINISHED:
          return {
            ...state,
            editarProducto: action.payload,
          };

        default:
          return state;

      }
    }
  }