import fetch from 'isomorphic-fetch'

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

export const LOGIN ="login"
export function login(username,password){
	//这里根据用户名和密码进行判断
	console.log(username+":"+password)
	let isLogin =username=='scj'&&password=='123';
	return {
		type:LOGIN,
		isLogin
	}
}