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
						<ul key={item.id} className="item-content clearfix">
							<li className="td item-chk">
								<input type="checkbox" />
							</li>
							<li className="td">
								<img className="item-pic" src={item.imgUrl} />
							</li>
							<li className="td item-detail">
								<span>{item.songName} - {item.singerName}</span><br/>
								<span>{item.albumName}</span>
							</li>
							<li className="td item-trash">
								<span >
									<i className="fa fa-trash fa-2x"></i>
								</span>
							</li>
						</ul>
						)
				})
			}
		</div>)
	}
}

export default MusicShoppingCart