import React from 'react';
import { render } from 'react-dom';
import MyRouter from './components/MyRouter.jsx';
import {BrowserRouter,Route,Link} from 'react-router-dom';

const Test =({match})=>{
	return <h1>Hello,{match.params.username}</h1>;
}

render(
	<MyRouter />,
    document.getElementById('content')
);
