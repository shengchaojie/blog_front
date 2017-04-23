import HelloWorld from './HelloWorld.jsx';
import React ,{Component} from  'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import LoginModule from './LoginMoudle.jsx';
import {createStore} from  'redux';
import {Provider} from 'react-redux';
import RegisterMoudle from './RegisterMoudle.jsx';
import {store,history} from '../store/configureStore.js'
import { syncHistory, routeReducer } from 'redux-simple-router'

const Home =()=>{
	return <div>hello,world</div>
}

class MyRouter extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<Provider store={store}>
				<Router history={history}>
					<div>
						<nav className="navbar navbar-default navbar-fixed-top">
			    		<div className="container-fluid">
					        <div className="navbar-header">
					            <a className="navbar-brand" href="#">生生思凡</a>
					        </div>
					        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					            <ul className="nav navbar-nav navbar-left">
					                <li><Link to="/">首页</Link></li>
					                <li><Link to="/login">登录</Link ></li>
					                <li><Link to="/topics">弹幕留言</Link ></li>
					                <li className="dropdown">
					                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">笔记 <span className="caret"></span></a>
					                    <ul className="dropdown-menu" role="menu">
					                        <li><a href="${pageContext.request.contextPath}/note">所有笔记</a></li>
					                        <li><a href="#">我的笔记</a></li>
					                        <li><a href="${pageContext.request.contextPath}/noteAdd">新笔记</a></li>
					                    </ul>
					                </li>
					            </ul>
					        </div>
				    	</div>
						</nav>
						<div id="container">
							<Route path="/" exact component={Home}/>
				      		<Route path="/login" component={LoginModule}/>
				      		<Route path="/topics" component={HelloWorld}/>
				      		<Route path="/register" component={RegisterMoudle}/>
						</div>
			      	</div>
				</Router>
			</Provider>
		);
	}
}

export default MyRouter;