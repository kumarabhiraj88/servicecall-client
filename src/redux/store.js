import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

//if you are in dev mode and you don't have Redux DevTools extension installed in your browser, your app will break, because window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ is not defined. What you really need is this:
// const composeEnhancers =
// 	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// 		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
// 		: compose;

//To use middleware in Redux, we use the applyMiddleware() function exported by the Redux library
const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancer)
const mystore = createStore(rootReducer, composedEnhancers);

export default mystore;