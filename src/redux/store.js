import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' 
import rootReducer from './rootReducer'

// const thunk = ({dispatch, getState}) => next => action => {
//     if(typeof action === "function") {
//         return action(dispatch, getState)
//     }
//     return next(action)
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

 export default store