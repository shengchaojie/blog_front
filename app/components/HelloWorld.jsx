import React,{Component} from 'react'
import {connect} from 'react-redux'
import {testHello,testBye} from '../actions'

class BasicExample extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		const {name,onClick,onClick2,byeName} =this.props
		return (
			<div>
				<div onClick={onClick}>
				hello,{name}
				</div>
				<div onClick={onClick2}>
				bye,{byeName}
				</div>
			</div>
			
		);
	}
}

function mapStateToProps(state){
	const {name} =state.hello
	const {byeName} =state.bye
	return {
		name,
		byeName
	};
}

function mapDispatchToProps(dispatch){
	const randomName =['scj','tiancai','beauty',"shengchaojie","cuihua","dakangshuju"]
	return{
		onClick:()=>{
			dispatch(testHello(randomName[Math.floor(Math.random()*randomName.length)]))
		},
		onClick2:()=>{
			dispatch(testBye(randomName[Math.floor(Math.random()*randomName.length)]))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(BasicExample)