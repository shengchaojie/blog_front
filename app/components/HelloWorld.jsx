import React,{Component} from 'react'
import {connect} from 'react-redux'
import {testHello,testBye} from '../actions'
import ReactMusicPlayer from './ReactMusicPlayer.js'

class BasicExample extends Component{
	constructor(props) {
		super(props);
		this.songs =[{
			url: 'http://m10.music.126.net/20170606205726/2975dfa6ad059fcb3e6e1c4b3c81c7f9/ymusic/0dd9/d28b/e089/fcbab41f4900212553c5b610c617da2a.mp3',
    		cover: 'http://p3.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg',
		    artist: {
		      name: '周杰伦',
		      song: '告白气球'
		    }
		}]
	}
	render() {
		return (
			<div>
				<ReactMusicPlayer songs={this.songs} autoplay />
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