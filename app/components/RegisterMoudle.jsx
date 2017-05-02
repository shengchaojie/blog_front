import React ,{Component} from  'react';
import DateTimeField from  'react-bootstrap-datetimepicker'
import {register} from '../actions';
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux';

class RegisterMoudle extends Component{
	constructor(props) {
		super(props);
		this.info={
			username:'',
			password:'',
			repassword:'',
			nickname:'',
			age:'',
			birth:'',
			gender:'0'
		}
		this.onRegisterClick =this.onRegisterClick.bind(this)
	}
	handleChange(name,event){
		this.info[name]=event.target.value
	}
	onRegisterClick(){
		const {dispatch,history} =this.props
		console.log(this.info)
		dispatch(register(this.info,history))
	}
	render() {
		return(
			<div className="register-form form-horizontal" id="registerForm">
		        <div className="form-group">
		            <label  className="col-sm-2">用户名:</label>
		            <div className="col-sm-6">
		                <input type="text" name="username" id="username" placeholder="请输入用户名" className="form-control"  onChange={this.handleChange.bind(this,'username')}/>
		            </div>
		        </div>
		        <div className="form-group">
		            <label  className="col-sm-2">密码:</label>
		            <div className="col-sm-6">
		                <input type="password" name="password" id="password" placeholder="请输入密码" className="form-control"  onChange={this.handleChange.bind(this,'password')}/>
		            </div>
		        </div>
		        <div className="form-group">
		            <label  className="col-sm-2">密码确认:</label>
		            <div className="col-sm-6">
		                <input type="password" name="password_check" id="password_check" placeholder="请再次输入密码" className="form-control" onChange={this.handleChange.bind(this,'repassword')}/>
		            </div>
		        </div>
		        <div className="form-group">
		            <label  className="col-sm-2">昵称:</label>
		            <div className="col-sm-6">
		                <input type="text" name="nickname" id="nickname" placeholder="请输入昵称" className="form-control"  onChange={this.handleChange.bind(this,'nickname')}/>
		            </div>
		        </div>
		        <div className="form-group">
		            <label  className="col-sm-2">年龄:</label>
		            <div className="col-sm-6">
		                <input type="text" name="age" id="age" placeholder="请输入年龄" className="form-control"  onChange={this.handleChange.bind(this,'age')}/>
		            </div>
		        </div>
		        <div className="form-group">
		            <label  className="col-sm-2">出生日期:</label>
		            <div className="col-sm-6">
		                <DateTimeField viewMode="years" inputFormat="YYYY-MM-DD" onChange={this.handleChange.bind(this,'age')}/> 
		            </div>
			    </div>
		        <div className="form-group">
		            <label  className="col-sm-2">性别:</label>
		            <div className=" col-sm-6">
		                <label className="radio-inline">
		                    <input type="radio" name="gender" id="gender1" value="0" defaultChecked  onClick={this.handleChange.bind(this,'gender')}/>
		                    男
		                </label>
		                <label className="radio-inline">
		                    <input type="radio" name="gender" id="gender2" value="1"  onClick={this.handleChange.bind(this,'gender')}/>
		                    女
		                </label>
		            </div>
		        </div>
		        <div className="form-group" >
		            <div className="col-sm-2 col-sm-offset-2">
		                <button className="btn btn-block btn-primary" type="submit" onClick={()=>this.onRegisterClick()}>注册</button>
		            </div>
		            <div className="col-sm-2">
		                <button className="btn btn-block btn-success" type="button" id="reset">重置</button>
		            </div>
		        </div>
        	</div>
		);
	}
}

function mapStateToProps(state){
	const {} =state.login
	console.log(state)
	return {

	};
}


export default connect()(RegisterMoudle);