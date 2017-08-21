import React,{Component} from 'react'
import {connect} from 'react-redux'
import '../../style/music.less'
import {Affix} from 'antd'
import classnames from 'classnames'
import { Row, Col ,Select,Upload, message, Button, Icon,Input,Table,Modal} from 'antd'
import {context} from '../../constants/GlobalConstants.js'
import '../../style/modal.less'
import '../../style/music.less'
import '../../style/upload.less'
import UrlCell from './UploadUrlCell.jsx'
import {hidePic,pagePics} from '../../actions'
var Clipboard = require('clipboard');

const Option = Select.Option;

const columns =[{
	title:'URL',
	dataIndex:'url',
	key:'url',
	render:(text,record) => <UrlCell imgUrl={text} lineNo={record.id}/>
},{
	title:'描述',
	dataIndex:'description',
	key:'description'
},{
	title:'上传时间',
	dataIndex:'uploadTime',
	key:'uploadTime',
	render:(text,record)=>{
		var date = new Date(text);
		//console.log(record)
		return <span>{date.format('yyyy-MM-dd hh:mm:ss')}</span>
	}
}];

class UploadPanel extends Component{
	constructor(props) {
		super(props);
		this.handleTableChange =this.handleTableChange.bind(this)
		this.handleUpload =this.handleUpload.bind(this)
		this.copyClient =null
		this.getCopyValue =this.getCopyValue.bind(this)
		this.emptyInput =this.emptyInput.bind(this)
	}
	state ={
		isFile:"1",
		fileList: [],
    	uploading: false,
    	data:this.props.data,
    	loading:false,
    	pagination: {
	    	showSizeChanger:true,
	    	showQuickJumper:true,
	    	pageSize:this.props.total,
	    	onShowSizeChange:this.onShowSizeChange.bind(this),
	    	style:{padding:'0px 10px'},
	    	current:1,
	    	pageSize:10
	    },
	    imgVisiable:this.props.imgVisiable,
	    imgUrl:this.props.imgUrl,
	    description:'',
	    uploadUrl:'',
	    copyVisiable:false,
	    copyUrl:'',
	}
	onShowSizeChange(current,size){
		const {pagination} =this.state;
		pagination.pageSize =size;
		this.setState({
			pagination:pagination
		})
	}
	onSelectClick(value){
		this.setState({isFile:value});
		//console.log(this.refs.desc.refs.input)
		this.emptyInput()
	}
	emptyInput = ()=>{
		//this.refs.desc.refs.input.value=''
		//this.refs.url.refs.input.value=''
		this.setState({
			fileList: [],
			description:'',
			uploadUrl:''
		})
	}
	handleUpload(){
		const { fileList, isFile} = this.state;
		if(isFile=="1"){
			const formData = new FormData();
		    formData.append('file', fileList[0]);
		    formData.append('description',this.state.description);
		    fetch(context+'/img/upload',{
		    	method: 'POST',
	  			body: formData,
		    })
		    .then(response=>response.json())
	    	.then(response=>{
	    		if(response.code === 200){
	    			this.props.onLoadData(1,10,'')
	    			this.setState({
						//fileList:[],
						isFile:"1",
						copyVisiable:true,
						copyUrl:response.object
					})
	    		}else{
	    			message.error(response.message)
	    		}
	    		this.emptyInput()
	    	})
		}else{
			const data = 'url='+encodeURIComponent(this.state.uploadUrl)+'&description='+encodeURIComponent(this.state.description);
			fetch(context+"/img/uploadUrl",{
				method:'POST',
				headers: {
				    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8 '
				},
				body:data
			})
			.then(response=>response.json())
			.then(response=>{
	    		if(response.code === 200){
	    			this.props.onLoadData(1,10,'')
	    			this.setState({
						//fileList:[],
						isFile:"1",
						copyVisiable:true,
						copyUrl:response.object
					})
	    		}else{
					message.error(response.message)
	    		}
	    	})
	    	this.emptyInput()
		}
		
	}
	handleTableChange(pagination,filters,sorter){
		const pager = this.state.pagination ;
	    pager.current = pagination.current;
	    this.setState({
	      pagination: pager,
	    });
/*	    this.fetchImageInfos({
	    	page:pager.current,
	    	limit:pager.pageSize
	    });*/
	    this.props.onLoadData(pager.current,pager.pageSize,'')
	}
	componentWillMount() {
		const pager = this.state.pagination ;
		this.props.onLoadData(pager.current,pager.pageSize,'')
	}
	getCopyValue = (t)=>{
		message.info("已经复制到剪切板");
		return this.state.copyUrl;
	}
	componentDidUpdate() {
		//console.log('did update')
		const {copyUrl} = this.state
		/*if(this.copyClient!=null){
			this.copyClient.destroy()
		}*/
		if(this.copyClient==null)
			this.copyClient = new Clipboard('.ant-modal-footer > .ant-btn-primary',{
	        	text:this.getCopyValue
	        })
        //console.log(this.copyClient)
	}
	handleDescriptionChange(event){
		console.log(event.target.value)
		this.setState({
			description:event.target.value
		});
	}
	handleUploadUrlChange(event){
		console.log(event.target.value)
		this.setState({
			uploadUrl:event.target.value
		});
	}
    componentWillReceiveProps(nextProps){
		const pagination =this.state.pagination
		pagination.total =nextProps.total
		this.setState({
			imgVisiable:nextProps.imgVisiable,
    		imgUrl:nextProps.imgUrl,
    		data:nextProps.data,
    		pagination:pagination,
		});
	}
	render(){
		let fileStyle =this.state.isFile=="1"?{display:'block',widht:'100%'}:{display:'none'};
		let urlStyle =this.state.isFile!="1"?{display:'block',widht:'100%'}:{display:'none'};

		const props = {
		  name: 'file',
		  beforeUpload: (file) => {
		        this.setState({
		          fileList: [ file],
		        });
		        return false;
		  },
		  onRemove:(file) =>{
	  		this.setState({
		          fileList: [ ],
		        });
	  		return true;
		  },
		  fileList: this.state.fileList,
		};

		return(
			<div  className="music-chart">
				<div style={{border:'1px solid #fff',margin:'0 0 20px 0',padding:'5px',backgroundColor:'white',minHeight:'100px'}}>
					<Row style={{margin:'10px 0 10px 0'}}>
						<Col span={4} offset={2}>
							<Select style={{width:'80%'}}  value={this.state.isFile} onChange={this.onSelectClick.bind(this)}>
								<Option value="1" >文件上传</Option>
								<Option value="2" >URL上传</Option>
							</Select>
						</Col>
						<Col span={12} >
							<div style={fileStyle}>
							<Upload {...props} >
							    <Button  style={{width:'100%'}}>
							      <Icon type="upload" /> Click to Upload
							    </Button>
						    </Upload>
						    </div>
						    <Input addonBefore="" addonAfter="" placeholder="url" ref="url" style={urlStyle} value={this.state.uploadUrl} onChange={this.handleUploadUrlChange.bind(this)}/>
						</Col>
						
					</Row>
					<Row style={{margin:'10px 0 10px 0'}}>
						<Col span={12} offset={6}>
							<Input  placeholder="description" ref="desc" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}/>
						</Col>
						<Col span={2} offset={1}>
							<Button onClick={this.handleUpload.bind(this)} disabled={this.state.fileList.length === 0&&this.state.uploadUrl.length ==0}>提交</Button>
						</Col>
					</Row>
				</div>
				<div style={{backgroundColor:'white'}}>
					<Table columns={columns} rowKey="id" dataSource={this.state.data} loading={this.state.loading} pagination={this.state.pagination} onChange={this.handleTableChange}/>
				</div>
				<Modal
		          title={null}
		          visible={this.state.imgVisiable}
		          onOk={()=>{
		          	this.props.onHideImgClick()
		          }}
		          onCancel={()=>{
		          	this.props.onHideImgClick()
		          }}
		          wrapClassName={'web'}
		          closable ={false}
		          footer ={null}
		        >
		          <img src={this.state.imgUrl} style={{width:'100%',height:'100%'}} ></img>
		        </Modal>
		        <Modal
		          title={'上传成功'}
		          visible={this.state.copyVisiable}
		          onOk={()=>{
	          		this.setState({
		          		copyVisiable:false
		          	})
		          }}
		          onCancel={()=>{
		          	this.setState({
		          		copyVisiable:false
		          	})
		          }}
		          closable ={true}
		        >
		          <div>保存图片的URL为:{this.state.copyUrl},点击确定复制URL</div>
		        </Modal>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		imgVisiable:state.upload.imgVisiable,
		imgUrl:state.upload.imgUrl,
		data:state.uploadInfo.data,
		total:state.uploadInfo.total
	}
}

function mapDispatchToProps(dispatch){
	return {
		onHideImgClick:() =>{
			dispatch(hidePic())
		},
		onLoadData:(page,limit,description)=>{
			dispatch(pagePics(page,limit,description))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadPanel)