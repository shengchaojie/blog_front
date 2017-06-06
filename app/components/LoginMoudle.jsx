import React ,{Component} from  'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import RegisterMoudle from './RegisterMoudle.jsx'
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux';
import {login} from '../actions';

class LoginModal extends Component{
	constructor(props) {
		super(props);
		this.onRedirectClick=this.onRedirectClick.bind(this)
		this.onLoginClick =this.onLoginClick.bind(this)
		//this.handleChange=this.handleChange.bind(this)
		this.user ={
			username:'',
			password:''
		}
	}
	onRedirectClick(path){
		const {history} = this.props
		history.push(path)
	}
	handleChange(name,event){
		//console.log(event.target.value)
		this.user[name]=event.target.value
	}
	onLoginClick(username,password){
		const {dispatch,history} =this.props
		//console.log(username+":"+password)
		dispatch(login(username,password,history))
	}
	render() {
		
		const {isLogin} =this.props
		console.log(isLogin)
		return(
			<div className="container login-container form-singin">
	            <h2><strong>请登录</strong></h2>
	            <input type="text" name="username" placeholder="用户名"  className="form-control" value={this.username} onChange={this.handleChange.bind(this,'username')}/><br/>
	            <input type="password" name="password" placeholder="密码"  className="form-control" value={this.password} onChange={this.handleChange.bind(this,'password')}/><br/>
	            <button className="btn btn-lg btn-primary btn-block" id="login" onClick={()=>this.onLoginClick(this.user.username,this.user.password)}>登陆</button>
	            <button  className="btn btn-lg btn-block btn-success" onClick={()=>this.onRedirectClick('/register')} role="button">注册</button>
    			
    		</div>
		)
	}
}

/*function mapDispatchToProps(dispatch){
	return {
		onLoginClick:(username,password)=>{
			console.log(username+":"+password)
			dispatch(login(username,password))
		},
		onTestClick(){
			console.log('test')
		}
	}
}*/

function mapStateToProps(state){
	//console.log(state)
	const {isLogin,info} =state.user
	//console.log(state)
	return {
		isLogin,
		info,
	};
}

export default connect(mapStateToProps)(LoginModal);