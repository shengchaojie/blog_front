import {combineReducers} from 'redux'
import {TEST_HELLO,TEST_BYE,LOGIN} from '../actions'
import fetch from 'isomorphic-fetch'
import { UPDATE_LOCATION, routeReducer } from 'redux-simple-router'

function hello(state={
	name:'scj'
},action){
	switch(action.type){
		case TEST_HELLO:
			return Object.assign({},state,{
				name:action.name+"2"
			})
		default:
			return state
	}
}
function bye(state={
	byeName:'scj'
},action){
	switch(action.type){
		case TEST_BYE:
			return Object.assign({},state,{
				byeName:action.byeName+"3"
			})
		default:
			return state
	}
}
function login(state={
	isLogin:false,
	username:'',
	password:''
},action){
	switch(action.type){
		case LOGIN:
			console.log(action);
			return Object.assign({},state);
		default:
			return state
	}
}

function update(state="update", action) {
    switch(action.type) {
        case UPDATE_LOCATION:
        	console.log('update')
            return 'update'
        default:
            return state
    }
}

const rootReducer =combineReducers({
	hello,
	bye,
	login,
	update,
	routing: routeReducer
})

export default rootReducer