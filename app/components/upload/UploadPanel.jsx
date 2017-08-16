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
		return <span>{date.format('yyyy-MM-dd hh:mm:ss')}</span>
	}
}];

class UploadPanel extends Component{
	constructor(props) {
		super(props);
		this.handleTableChange =this.handleTableChange.bind(this)
		this.handleUpload =this.handleUpload.bind(this)
	}
	state ={
		isFile:true,
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
	    description:''
	}
	onShowSizeChange(current,size){
		const {pagination} =this.state;
		pagination.pageSize =size;
		this.setState({
			pagination:pagination
		})
	}
	onSelectClick(value){
		this.setState({isFile:value==1});
	}
	handleUpload(){
		const { fileList } = this.state;
	    const formData = new FormData();

	    formData.append('file', fileList[0]);
	    formData.append('description',this.state.description);
	    fetch(context+'/img/upload',{
	    	method: 'POST',
  			body: formData
	    })
	    .then(response=>response.json())
    	.then(response=>{
    		if(response.code === 200){
    			this.props.onLoadData(1,10,'')
    			message.success("上传成功");
    			this.setState({
    				fileList:[]
    			})
    			
    		}
    	})
	}
	handleTableChange(pagination,filters,sorter){
		console.log('pagination')
		console.log(this.state)
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
	/*fetchImageInfos(params){
		this.setState({ loading: true });
		fetch(context+'/img/upload/list',{
			method:'POST',
			headers: {
		    	'Content-Type': 'application/json'
		   	},
		   	body:JSON.stringify(params)
		})
		.then(response=>response.json())
		.then(result =>{
			const pagination =this.state.pagination;
    		pagination.total =result.object.total;
    		var data =result.object.list;
    		this.setState({
    			loading: false,
		        data: data,
		        pagination,
    		});
		})
	}*/
	componentWillMount() {
		/*this.fetchImageInfos({
			page:1,
			limit:10,
			description:''
		})*/
		const pager = this.state.pagination ;
		this.props.onLoadData(pager.current,pager.pageSize,'')
	}
	handleOk = (e) => {
	    this.props.onHideImgClick()
	}
	handleCancel = (e) => {
	    this.props.onHideImgClick()
	}
	handleDescriptionChange(event){
		console.log(event.target.value)
		this.setState({
			description:event.target.value
		});
	}
    componentWillReceiveProps(nextProps){
		const pagination =this.state.pagination
		pagination.total =nextProps.total
		this.setState({
			imgVisiable:nextProps.imgVisiable,
    		imgUrl:nextProps.imgUrl,
    		data:nextProps.data,
    		pagination:pagination
		});
	}
	/*componentDidMount() {
		console.log('did mount')

		var client = new ZeroClipboard( $('.clip_button') );

        console.log(client)

        client.on( 'copy', function(event) {
          event.clipboardData.setData('text/plain', event.target.innerHTML);
        } );

        client.on( 'aftercopy', function(event) {
          console.log('Copied text to clipboard: ' + event.data['text/plain']);
        } );
	}*/
	render(){
		let fileStyle =this.state.isFile?{display:'block',widht:'100%'}:{display:'none'};
		let urlStyle =!this.state.isFile?{display:'block',widht:'100%'}:{display:'none'};

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
				<div style={{border:'1px solid #fff',margin:'0 0 20px 0',padding:'5px',backgroundColor:'white',height:'100px'}}>
					<Row style={{margin:'10px 0 10px 0'}}>
						<Col span={4} offset={2}>
							<Select style={{width:'80%'}} defaultValue="1" onChange={this.onSelectClick.bind(this)}>
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
						    <Input addonBefore="Http://" addonAfter="" placeholder="mysite" style={urlStyle} onChange={this.handleDescriptionChange.bind(this)}/>
						</Col>
						
					</Row>
					<Row style={{margin:'10px 0 10px 0'}}>
						<Col span={12} offset={6}>
							<Input  placeholder="description" ref="desc" onChange={this.handleDescriptionChange.bind(this)}/>
						</Col>
						<Col span={2} offset={1}>
							<Button onClick={this.handleUpload.bind(this)} disabled={this.state.fileList.length === 0}>提交</Button>
						</Col>
					</Row>
				</div>
				<div style={{backgroundColor:'white'}}>
					<Table columns={columns} dataSource={this.state.data} loading={this.state.loading} pagination={this.state.pagination} onChange={this.handleTableChange}/>
				</div>
				<Modal
		          title={null}
		          visible={this.state.imgVisiable}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		          wrapClassName={'web'}
		          closable ={false}
		          footer ={null}
		        >
		          <img src={this.state.imgUrl} style={{width:'100%',height:'100%'}} ></img>
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