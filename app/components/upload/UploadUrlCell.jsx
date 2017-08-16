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
			lineNo:nextProps.lineNo
		});
	}
	componentDidMount() {
		/*var client = new ZeroClipboard( $('.clip_button'+this.state.lineNo) );
        client.on( 'copy', function(event) {
          event.clipboardData.setData('text/plain', event.target.getAttribute('data-value'));
          alert('复制成功')
        } );*/

        /*client.on( 'aftercopy', function(event) {
          console.log('Copied text to clipboard: ' + event.data['text/plain']);
        });*/
        //console.log(new Clipboard('.clip_button'));
        var client = new Clipboard('.clip_button'+this.state.lineNo,{
        	text:function(trigger){
        		message.info("已经粘帖到剪切板");
        		return trigger.getAttribute('data-value');
        	}
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