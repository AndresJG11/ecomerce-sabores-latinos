import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {CategoriasReducer, ProductosReducer} from 'stores'

const reducers = combineReducers({CategoriasReducer: CategoriasReducer.reducer, ProductosReducer: ProductosReducer.reducer})
        



export const rootStore = () => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return{
        ...createStore(reducers, composeEnhancers(applyMiddleware(thunk)) )
    }
}