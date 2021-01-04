import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const reducers = () => {
    return({})
}

export default () => {
    return{
        ...createStore(reducers, applyMiddleware(thunk))
    }
}