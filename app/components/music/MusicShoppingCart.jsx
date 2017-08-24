import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Pagination,Table,message,Modal,Button,Avatar} from 'antd'
import '../../style/music.less'

class MusicShoppingCart extends Component{
	constructor(props) {
		super(props);
		this.state ={
			songs:this.props.songs
		}
	}
	componentWillReceiveProps(nextProps){
    	console.log(nextProps)
		this.setState({
			songs:nextProps.songs
		});
	}
	render(){
		return(<div>
			{
				this.state.songs.map((item)=>{
					return(
						<ul key={item.id}>
						<li >
							<div><Avatar src={item.imgUrl} /> {item.songName}-{item.singerName}</div>
							<div>{item.albumName}</div>
						</li>
						</ul>
						)
				})
			}
		</div>)
	}
}

export default MusicShoppingCart