import CategoriasAction from "./categoriasAction";

export class CategoriasReducer {
    static initialState = {
        categorias : []
    };
  
    static reducer(state = CategoriasReducer.initialState, action : any) {

      if (action.error) {
        return state;
      }
  
      switch (action.type) {

        case CategoriasAction.REQUEST_CATEGORIAS_FINISHED:
          return {
            ...state,
            categorias: action.payload,
          };

        default:
          return state;
      }
    }
  }