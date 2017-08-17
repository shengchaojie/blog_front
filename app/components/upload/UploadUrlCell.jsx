import React,{Component} from 'react'
import {connect} from 'react-redux'
import '../../style/music.less'
import {Affix,message} from 'antd'
import classnames from 'classnames'
import {displayPic} from '../../actions'
var Clipboard = require('clipboard');

class UploadUrlCell extends Component{
	constructor(props) {
		super(props);
		this.handleClick =this.handleClick.bind(this)
		this.copyClient =null
		this.copyUrl = this.copyUrl.bind(this)
	}
	state ={
		imgUrl:this.props.imgUrl,
		lineNo:this.props.lineNo
	}
	handleClick(){
		this.props.onShowImgClick(this.state.imgUrl)
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			imgUrl:nextProps.imgUrl,
		});
	}
	copyUrl =() =>{
		message.info("已经复制到剪切板")
		return this.state.imgUrl
	}
	componentDidMount() {
        //console.log(this.state.lineNo+"did mount ")
        this.copyClient = new Clipboard('.clip_button'+this.state.lineNo,{
        	text:this.copyUrl
        });

	}
	componentDidUpdate() {
        //console.log(this.state.lineNo+"did update ")
        if(this.copyClient==null)
	        this.copyClient = new Clipboard('.clip_button'+this.state.lineNo,{
	        	text:this.copyUrl
	        });
	}
	render(){
		let copyClass =classnames("fa fa-files-o","clip_button"+this.state.lineNo)
		return(
			<div>
			<span >
				{this.state.imgUrl}
			</span> &nbsp;&nbsp;
			<span className={copyClass} data-value={this.state.imgUrl} aria-hidden="true" title="复制链接"></span>&nbsp;&nbsp;
			<span className="fa fa-search" aria-hidden="true" onClick={this.handleClick} title="查看图片"> </span>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return {
		onShowImgClick:(imgUrl) =>{
			dispatch(displayPic(imgUrl))
		}
	}
}

export default connect(state=>state,mapDispatchToProps)(UploadUrlCell)