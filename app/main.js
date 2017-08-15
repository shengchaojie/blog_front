import React from 'react';
import { render } from 'react-dom';
import MyRouter from './components/MyRouter.jsx';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import {Affix,Button} from 'antd'
import './style/music.less'
//import MusicSideBar from './components/MusicSideBar.jsx'

const Test =({match})=>{
	return <h1>Hello,{match.params.username}</h1>;
}

render(
	<div>
		<MyRouter />
	</div>
	,
    document.getElementById('content')
);
