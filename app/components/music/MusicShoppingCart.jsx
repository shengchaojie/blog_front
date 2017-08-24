import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Pagination,Table,message,Modal,Button,Avatar} from 'antd'

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
			<ul>
			{
				this.state.songs.map((item)=>{
					return(
						<li key={item.id}>
							<div><Avatar src={item.imgUrl} /> {item.songName}-{item.singerName}</div>
							<div>{item.albumName}</div>
						</li>
						)
				})
			}
			</ul>
		</div>)
	}
}

export default MusicShoppingCart