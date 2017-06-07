import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Pagination,Table,message,Modal,Button} from 'antd'
import {context} from '../constants/GlobalConstants.js'
import 'isomorphic-fetch'
import ReactMusicPlayer from './ReactMusicPlayer.js'
import '../style/modal.less'
import PlayCell from './MusicPlayCell.jsx'
import {stopMusic} from '../actions'

class RefreshCell extends Component{
	constructor(props) {
		super(props);
		this.handleClick =this.handleClick.bind(this);
		this.fetchCount =this.fetchCount.bind(this);
		this.state ={
			count:this.props.count,
			id:this.props.id
		}
	}
	handleClick(songId){
		this.fetchCount(songId);
	}
	fetchCount(songId){
		fetch(context+'/music/song/count?songId='+songId,{
    		method:'GET',
    	})
    	.then(response=>response.json())
    	.then(response=>{
    		if(response.code ==200){
    			message.info('更新成功');
    			this.setState({
    			count:response.object
    			})
    		}
    	})
	}
	componentWillReceiveProps(nextProps){
		this.state ={
			count:nextProps.count,
			id:nextProps.id
		}
	}
	render(){
		const {count,id} =this.state;
		return(
			<span>
				{count}&nbsp;
				<span className='glyphicon glyphicon-refresh' onClick={()=>this.handleClick(id || 0)}></span>
			</span>
		);
	}
}



class MusicChart extends Component{
	constructor(props){
		super(props);
		this.handleTableChange=this.handleTableChange.bind(this);
		this.onShowSizeChange=this.onShowSizeChange.bind(this);
		this.onShowSizeChange=this.onShowSizeChange.bind(this);
		this.columns =[
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
			key:'commentCount',
			render: (text,record) => <RefreshCell count={text} id={record.id}/>
		},
		{
			title:'创建时间',
			dataIndex:'createTime',
			key:'createTime'
		},
		{
			title:'播放',
			dataIndex:'play',
			key:'play',
			render:(text,record) => <PlayCell record={record} />
		}
		];
		this.state ={
	    data: [],
	    pagination: {
	    	showSizeChanger:true,
	    	showQuickJumper:true,
	    	pageSize:10,
	    	onShowSizeChange:this.onShowSizeChange,
	    	onChange:this.onPaginationChange,
	    	style:{padding:'0px 10px'}
	    },
	    loading: false,
	    songs:this.props.songs,
    	autoplay:this.props.autoplay,
    	visible:this.props.visible
  		}
  		this.handleCancel =this.handleCancel.bind(this)
  		
	}
	onPaginationChange(page, pageSize){
		
	}
	onShowSizeChange(current,size){
		const {pagination} =this.state;
		pagination.pageSize =size;
		this.setState({
			pagination:pagination
		})
	}
	fetch(params){
    	this.setState({ loading: true });
    	fetch(context+'/music/page',{
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
	    pager.current = pagination.current;
	    this.setState({
	      pagination: pager,
	    });
	    this.fetch({
	    	page:pager.current,
	    	limit:pager.pageSize
	    });
	}
	handleOk (e){
	    this.setState({
	      visible: false,
	    });
  	}
  	handleCancel(e) {
	    const {onStopMusic} =this.props;
	    onStopMusic(this.state.songs);
    }
    componentWillReceiveProps(nextProps){
		this.setState({
			songs:nextProps.songs,
    		autoplay:nextProps.autoplay,
    		visible:nextProps.visible
		});
	}
	render(){
		return (
			<div style={{backgroundColor:'white'}} className="music-chart">
			<h1>评论数排行榜</h1>
			<Table columns={this.columns}
		        rowKey={record => record.registered}
		        dataSource={this.state.data}
		        pagination={this.state.pagination}
		        loading={this.state.loading}
		        onChange={this.handleTableChange}
		      	/>
	      	<Modal
	          title={null}
	          closable ={true}
	          visible={this.state.visible}
	          onOk={this.handleOk}
	          onCancel={this.handleCancel}
	          footer = {null}
	          wrapClassName={'web'}
	        >
	          <ReactMusicPlayer songs ={this.state.songs} autoplay={this.state.autoplay}/>
	        </Modal>
	      	</div>
		)
	}
}

function mapStateToProps(state){
	return{
		songs:state.music.songs,
    	autoplay:state.music.autoplay,
    	visible:state.music.visible
	}
}

function mapDispatchToProps(dispatch){
	return {
		onStopMusic:(songs)=>{
			dispatch(stopMusic(songs))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(MusicChart);