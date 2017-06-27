import {combineReducers} from 'redux'
import {TEST_HELLO,TEST_BYE,LOGIN,REGISTER,USERINFO,userinfo} from '../actions'
import fetch from 'isomorphic-fetch'
import { UPDATE_LOCATION, routeReducer } from 'redux-simple-router'
import {get,post} from '../util/requestUtil'
import music from './music.js'

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
function user(state={
	isLogin:false,
	username:'',
	password:''
},action){
	switch(action.type){
		case LOGIN:
			return Object.assign({},state,{
				isLogin:action.isLogin
			});
		case REGISTER:
			if(action.password != action.repassword){
				alert('两次密码必须一致');
				return;
			}
			var data ={
				username:action.username,
				password:action.password,
				userInfoVO:{
					age:action.age,
					birth:action.birth,
					gender:action.gender,
					nickName:action.nickname
				}
			}
			console.log(data)
			post('/user/register',data,function(result){
				console.log(result)
				if(result.code ==200){
					console.log(result)
					return dispatch =>{
						dispatch(userinfo(result.data.userInfo.nickname|'scj'))
						action.history.push("/")
					}
				}else{
					alert(result.message)
				}
			})

		case USERINFO:
			console.log(USERINFO)
			console.log(action)
			return Object.assign({},state,{
				nickname:action.nickname
			});
		default:
			return state
	}
}

function update(state="update", action) {
    switch(action.type) {
        case UPDATE_LOCATION:
            return 'update'
        default:
            return state
    }
}

const rootReducer =combineReducers({
	music,
	hello,
	bye,
	user,
	routing: routeReducer,
})

export default rootReducer