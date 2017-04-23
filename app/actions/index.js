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

function testLogin(isLogin){
	return {
		type:LOGIN,
		isLogin
	}
}

export const LOGIN ="login"
export function login(username,password){
	//这里根据用户名和密码进行判断
	console.log(username+":"+password)
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
		fetch('https://api.github.com/repos/typecho-fans/plugins/contents/').then(response=>{
		console.log(response.text());
		dispatch(testLogin(false));
	}) 
	}
}