import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Pagination,Table,message,Modal,Button} from 'antd'
import {context} from '../constants/GlobalConstants.js'
import 'isomorphic-fetch'
import ReactMusicPlayer from './ReactMusicPlayer.js'
import '../style/modal.less'
import {playMusic} from '../actions'

class PlayCell extends Component{
	constructor(props) {
		super(props);
		this.onPlayMusic =this.props.onPlayMusic.bind(this)
		this.onJoinShoppingCart=this.props.onJoinShoppingCart.bind(this)
		this.state={
			songInfo :this.props.record,
		}
	}
	componentWillReceiveProps(nextProps){
		this.state={
			songInfo :nextProps.record,
		}
	}
	render(){
		return(
			<div>
				<span onClick={()=>this.onPlayMusic(this.state.songInfo,true)} style={{marginRight:'5px'}}>
					<i className="fa fa-play" aria-hidden="true"></i>
				</span>
				<span  onClick={()=>this.onJoinShoppingCart(this.state.songInfo)}>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</span>
			</div>
			);
	}
	
}	
function mapDispatchToProps(dispatch){
	return {
		onPlayMusic:(songInfo,autoplay)=>{dispatch(playMusic(songInfo,autoplay))},
		onJoinShoppingCart:(songInfo)=>{alert(songInfo.id)}
	}
}

function mapStateToProps(state){
	return state;
}
export default connect(() => ({}),mapDispatchToProps)(PlayCell)