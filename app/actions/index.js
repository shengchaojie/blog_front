import {get,post} from '../util/requestUtil'
import { routeActions } from 'redux-simple-router'

export const TEST_HELLO ="test_hello"
export const TEST_BYE ="test_bye"

export function testHello(name){
	return {
		type:TEST_HELLO,
		name
	}
}

export function testBye(byeName){
	return {
		type:TEST_BYE,
		byeName
	}
}

function testLogin(isLogin){
	return {
		type:LOGIN,
		isLogin
	}
}

export const LOGIN ="login"
export function login(username,password,history){
	//这里根据用户名和密码进行判断
	//console.log(username+":"+password)
	/*let isLogin =username=='scj'&&password=='123';
	fetch('https://api.github.com/repos/typecho-fans/plugins/contents/').then(response=>{
		console.log(response.text());
		dispatch(testLogin(false));
	})
	return {
		type:LOGIN,
		isLogin
	}*/
	
	return dispatch =>{
		let isLogin =username=='scj'&&password=='123';
		dispatch(testLogin(isLogin));
		/*fetch('https://api.github.com/repos/typecho-fans/plugins/contents/').then(response=>{
		console.log(response.text());*/
		var data ={};
		data.username =username;
		data.password =password;
		post('/user/login',data,function(result){
			if(result.code ==200){
				console.log(result)
				dispatch(userinfo(result.object.userInfoVO.nickName))
				history.push('/')
			}else{
				alert(data.message)
			}
		})
		dispatch(testLogin(false));
	
	}
}

export const REGISTER ="register"
export function register(info,history){
	console.log(history)
	return {
		type:REGISTER,
		username:info.username,
		password:info.password,
		repassword:info.repassword,
		nickname:info.nickname,
		age:info.age,
		birth:info.birth,
		gender:info.gender,
		history:history
	}
}

export const USERINFO ="userinfo"
export function userinfo(nickname){
	console.log("nickname:"+nickname)
	return {
		type:USERINFO,
		nickname
	}
}