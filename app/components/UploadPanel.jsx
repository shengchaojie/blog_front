import React,{Component} from 'react'
import {connect} from 'react-redux'
import '../style/music.less'
import {Affix} from 'antd'
import classnames from 'classnames'
import { Row, Col ,Select,Upload, message, Button, Icon,Input,Table} from 'antd'
import {context} from '../constants/GlobalConstants.js'


const Option = Select.Option;

const columns =[{
	title:'URL',
	dataIndex:'url',
	key:'url'
},{
	title:'描述',
	dataIndex:'description',
	key:'description'
},{
	title:'上传时间',
	dataIndex:'uploadTime',
	key:'uploadTime'
}];

const data =[{
	url:'111',
	description:'test',
	uploadTime:'test'
}]

class UploadPanel extends Component{
	constructor(props) {
		super(props);
		
	}
	state ={
		isFile:true,
		fileList: [],
    	uploading: false,
	}
	onSelectClick(value){
		this.setState({isFile:value==1});
	}
	handleUpload(){
		const { fileList } = this.state;
	    const formData = new FormData();

	    formData.append('file', fileList[0]);
	    formData.append('description','123');
	    fetch(context+'/img/upload',{
	    	method: 'POST',
  			body: formData
	    })
	    .then(response=>response.json())
    	.then(response=>{
    		if(response.code === 200){
    			message.success("上传成功");
    			this.setState({
    				fileList:[]
    			})
    		}
    	}).bind(this)
	}
	render(){
		let fileStyle =this.state.isFile?{display:'block',widht:'100%'}:{display:'none'};
		let urlStyle =!this.state.isFile?{display:'block',widht:'100%'}:{display:'none'};

		const props = {
		  name: 'file',
		  action: '//jsonplaceholder.typicode.com/posts/',
		  headers: {
		    authorization: 'authorization-text',
		  },
		  onChange(info) {
		    if (info.file.status !== 'uploading') {
		      console.log(info.file, info.fileList);
		    }
		    if (info.file.status === 'done') {
		      message.success(`${info.file.name} file uploaded successfully`);
		    } else if (info.file.status === 'error') {
		      message.error(`${info.file.name} file upload failed.`);
		    }
		  },
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
			<div style={{border:'1px solid'}}>
				<Row>
					<Col span={6} >
						<Select style={{width:'80%'}} defaultValue="1" onChange={this.onSelectClick.bind(this)}>
							<Option value="1" >文件上传</Option>
							<Option value="2" >URL上传</Option>
						</Select>
					</Col>
					<Col span={14} >
						<div style={fileStyle}>
						<Upload {...props} >
						    <Button  style={{width:'100%'}}>
						      <Icon type="upload" /> Click to Upload
						    </Button>
					    </Upload>
					    </div>
					    <Input addonBefore="Http://" addonAfter="" placeholder="mysite" style={urlStyle}/>
					</Col>
					<Col span={4} >
						<Button onClick={this.handleUpload.bind(this)} disabled={this.state.fileList.length === 0}>提交</Button>
					</Col>
				</Row>
				<Row>
					<Col span={14} offset={6}>
						<Input  placeholder="description" />
					</Col>
				</Row>
				<Row>
					
				</Row>
				<Row>
					<Col span={24}>
						<Table columns={columns} dataSource={data} />
					</Col>
				</Row>
			</div>
		);
	}
}

export default UploadPanel