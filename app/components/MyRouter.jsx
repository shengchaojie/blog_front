import HelloWorld from './HelloWorld.jsx';
import React ,{Component} from  'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import LoginModule from './LoginMoudle.jsx';
import {createStore} from  'redux';
import {Provider} from 'react-redux';
import RegisterMoudle from './RegisterMoudle.jsx';
import {store,history} from '../store/configureStore.js'
import { syncHistory, routeReducer } from 'redux-simple-router'
import UserInfo from './UserInfo.jsx'
import MusicChart from './MusicChart.jsx'

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
						<nav className="navbar navbar-default ">
			    		<div className="container" style={{marginLeft:'45px'}}>
					        <div className="navbar-header">
					            <a className="navbar-brand" href="javascript:void(0)">超杰</a>
					        </div>
					        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					            <ul className="nav navbar-nav ">
					            	{
					                <li><Link to="/">云音乐</Link></li>
					                /*
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
									<li><Link to="/musicChart">云音乐</Link ></li>
					                */
					            }
					            
					            </ul>
					            <UserInfo />
					        </div>
				    	</div>
						</nav>
						<div id="container">
							<Route path="/" exact  component={MusicChart}/>
				      		<Route path="/login" component={LoginModule}/>
				      		<Route path="/topics" component={HelloWorld}/>
				      		<Route path="/register" component={RegisterMoudle}/>
			      			<Route path="/musicChart"  component={MusicChart}/>
						</div>
			      	</div>
				</Router>
			</Provider>
		);
	}
}

export default MyRouter;