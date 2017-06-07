import React,{Component} from 'react'
import {connect} from 'react-redux'
import {testHello,testBye} from '../actions'


class BasicExample extends Component{
	constructor(props) {
		super(props);
		this.fullText="HHHHHHHHelllo,world!this is funny!hhhhhhhhhh!i am shengchaojie !hello my world!";
		this.index =0;
		this.state={
			text:'Hello,world'
		}
		this.typeing =this.typing.bind(this);
		/*this.songs =[{
			url: 'http://m10.music.126.net/20170606215347/b3db5b0fb45f9da13e4a318f835dc746/ymusic/5e8c/9fbd/460a/63af292aec1f060e9a1c23a8c1bbff95.mp3',
    		cover: 'http://p3.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg',
		    artist: {
		      name: '周杰伦',
		      song: '告白气球'
		    }
		}]*/
	}
	componentDidMount(){
		this.typing();		
	}
	typing(){
		if (this.index <= this.fullText.length) {
			var splitText = this.fullText.slice(0,this.index++)+'_';
			this.setState({
				text:splitText
			});
			this.ctime =setTimeout(this.typing.bind(this),200)
		}else{
			this.setState({
				text:this.fullText
			});
		}
	}
	componentWillUnmount(){
		clearTimeout(this.ctime);
	}
	render() {
		return (
			<div>
				{this.state.text}
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

export default BasicExample