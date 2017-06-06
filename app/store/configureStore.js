import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import { syncHistory, routeReducer } from 'redux-simple-router'
import { Router, Route, browserHistory } from 'react-router'
import {createBrowserHistory,createHashHistory} from 'history'
import thunkMiddleware from 'redux-thunk'

export const history =createHashHistory()
const reduxRouterMiddleware = syncHistory(history)
const createStoreWithMiddleware = applyMiddleware(
		thunkMiddleware,
		reduxRouterMiddleware
	)(createStore)

history.listen(location => analyticsService.track(location.pathname))

export const store = createStoreWithMiddleware(rootReducer)
