import React,{Component} from 'react'
import {connect} from 'react-redux'
import '../style/music.less'
import {Affix} from 'antd'
import classnames from 'classnames';

class MusicSideBar extends Component{
	constructor(props) {
		super(props);
		this.state ={
			play:true
		}
		this.handlePlayClick =this.handlePlayClick.bind(this);
	}
	handlePlayClick(){
		this.setState({
			play:!this.state.play
		});
	}
	render(){
		let playClass =this.state.play?'list-group-item':'hide';
		let stopClass =(!this.state.play)?'list-group-item':'hide';

		console.log(playClass);

		return(
			<Affix offsetTop={400} style={{ position: 'absolute', top: '400px', right:'20px'}}>
				<div className="list-group">
					 <a className="list-group-item" href="#">
					<i className="fa fa-list-ul fa-fw fa-inverse" aria-hidden="true"></i>
					</a>
					 <a className="list-group-item" href="#">
					<i className="fa fa-fast-backward fa-fw fa-inverse" aria-hidden="true"></i>
					</a>
					 <a className={playClass} onClick={()=>this.handlePlayClick()} href="javascript:void(0)">
					<i className="fa fa-play fa-fw fa-inverse" aria-hidden="true"></i>
					</a>
					 <a className={stopClass} onClick={()=>this.handlePlayClick()} href="javascript:void(0)">
					<i className="fa fa-stop fa-fw fa-inverse" aria-hidden="true"></i>
					</a>
					 <a className="list-group-item" href="#">
					<i className="fa fa-step-forward fa-fw fa-inverse" aria-hidden="true"></i>
					</a>
				</div>
			</Affix>
		);
	}
}

export default MusicSideBar;