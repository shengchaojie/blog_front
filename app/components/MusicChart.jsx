import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Pagination,Table} from 'antd'
import {get,post} from '../util/requestUtil'
import 'isomorphic-fetch'

const columns =[
	{
		title:'歌名',
		dataIndex:'songName',
		key:'songName',
		render :(text,record) => <a href={record.songUrl} target='_blank'>{text}</a>
	},
	{
		title:'歌手',
		dataIndex:'singerName',
		key:'singerName'
	},
	{
		title:'专辑',
		dataIndex:'albumName',
		key:'albumName'
	},
	{
		title:'点赞数',
		dataIndex:'commentCount',
		key:'commentCount'
	},
	{
		title:'创建时间',
		dataIndex:'createTime',
		key:'createTime'
	}
	];


class MusicChart extends Component{
	constructor(props) {
		super(props);
		this.handleTableChange=this.handleTableChange.bind(this);
		this.onShowSizeChange=this.onShowSizeChange.bind(this);
		this.state ={
	    data: [],
	    pagination: {
	    	showSizeChanger:true,
	    	showQuickJumper:true,
	    	pageSize:10,
	    	onShowSizeChange:this.onShowSizeChange,
	    	style:{padding:'0px 10px'}
	    },
	    loading: false,
  		}
  		
	}
	onShowSizeChange(current,size){
		const pagination =this.state.pagination;
		pagination.pageSize =size;
		this.setState({
			pagination:pagination
		})
	}
	fetch(params){
		console.log('params:', params);
    	this.setState({ loading: true });


    	fetch('http://localhost/music/page',{
    		method:'POST',
    		headers: {
		    	'Content-Type': 'application/json'
		   	},
		   	body:JSON.stringify({
		   		page:params.page,
    			limit:params.limit
		   	})
    	}).then(response=>response.json())
    	.then(result=>{
    		const pagination =this.state.pagination;
    		pagination.total =result.object.total;
    		var data =result.object.list;
    		this.setState({
    			loading: false,
		        data: data,
		        pagination,
    		});
    	})
	}
	componentDidMount(){
		this.fetch({
			page:1,
			limit:10
		});
	}
	handleTableChange(pagination,filters,sorter){
		const pager = this.state.pagination ;
		console.log(pager);
	    pager.current = pagination.current;
	    this.setState({
	      pagination: pager,
	    });
	    this.fetch({
	    	page:pager.current,
	    	limit:pager.pageSize
	    });
	}
	render(){
		return (
			<div style={{backgroundColor:'white'}} className="music-chart">
			<h1>评论数排行榜</h1>
			<Table columns={columns}
		        rowKey={record => record.registered}
		        dataSource={this.state.data}
		        pagination={this.state.pagination}
		        loading={this.state.loading}
		        onChange={this.handleTableChange}
		      	/>
	      	</div>
		)
	}
}

export default MusicChart;