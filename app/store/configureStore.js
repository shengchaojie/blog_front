import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import { syncHistory, routeReducer } from 'redux-simple-router'
import { Router, Route, browserHistory } from 'react-router'
import {createBrowserHistory} from 'history'
import thunkMiddleware from 'redux-thunk'

export const history =createBrowserHistory()
const reduxRouterMiddleware = syncHistory(history)
const createStoreWithMiddleware = applyMiddleware(
		thunkMiddleware,
		reduxRouterMiddleware
	)(createStore)

export const store = createStoreWithMiddleware(rootReducer)
