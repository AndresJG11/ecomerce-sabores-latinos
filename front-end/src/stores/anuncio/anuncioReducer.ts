import AnuncioAction from "./anuncioAction";

export class AnuncioReducer {
    static initialState = {
        anuncios : null,
    };
  
    static reducer(state = AnuncioReducer.initialState, action : any) {

      if (action.error) {
        return state;
      }
  
      switch (action.type) {

        case AnuncioAction.REQUEST_OBTENER_ANUNCIOS_FINISHED:
          return {
            ...state,
            anuncios: action.payload,
          };

        default:
          return state;
      }
    }
  }