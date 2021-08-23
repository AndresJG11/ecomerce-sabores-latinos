import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {CategoriasReducer, ProductosReducer, AnuncioReducer, AlertaReducer} from 'stores'
import { CarritoReducer } from './carrito/carritoReducer'
import { SistemaReducer } from './sistema'
import { VentaReducer } from './venta'

const reducers = combineReducers(
    {
        CategoriasReducer: CategoriasReducer.reducer, 
        ProductosReducer: ProductosReducer.reducer,
        SistemaReducer: SistemaReducer.reducer,
        AnuncioReducer: AnuncioReducer.reducer,
        AlertaReducer: AlertaReducer.reducer,
        CarritoReducer: CarritoReducer.reducer,
        VentaReducer: VentaReducer.reducer,
    })
    
export const rootStore = () => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return{
        ...createStore(reducers, composeEnhancers(applyMiddleware(thunk)) )
    }
}