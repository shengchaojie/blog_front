import React,{Component} from 'react'
import {connect} from 'react-redux'

class UserInfo extends Component{
	constructor(props) {
		super(props);
		
	}

	render() {
		return(
			<div style={{'padding':'15px','float':'right'}}>
				{this.props.nickname}
			</div>)
	}
}

function mapStateToProps(state){
	console.log(state)
	const {nickname} =state.user
	return{
		nickname
	}
}

export default connect(mapStateToProps)(UserInfo)