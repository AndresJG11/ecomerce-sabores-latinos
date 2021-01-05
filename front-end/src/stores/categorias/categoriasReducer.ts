import CategoriasAction from "./categoriasAction";

export class CategoriasReducer {
    static initialState = {
        categoriasHome : [],
        listaCategorias : []
    };
  
    static reducer(state = CategoriasReducer.initialState, action : any) {

      if (action.error) {
        return state;
      }
  
      switch (action.type) {

        case CategoriasAction.REQUEST_CATEGORIAS_HOME_FINISHED:
          return {
            ...state,
            categoriasHome: action.payload,
          };

        case CategoriasAction.REQUEST_CATEGORIAS_LISTA_FINISHED:
          return {
            ...state,
            listaCategorias: action.payload,
          };

        default:
          return state;
      }
    }
  }