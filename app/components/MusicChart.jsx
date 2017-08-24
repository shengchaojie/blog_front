import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Pagination,Table,message,Modal,Button,Affix,Input} from 'antd'
import {context} from '../constants/GlobalConstants.js'
import 'isomorphic-fetch'
import ReactMusicPlayer from './ReactMusicPlayer.js'
import '../style/modal.less'
import PlayCell from './MusicPlayCell.jsx'
import {stopMusic} from '../actions'

message.config({
  top: 100,
  duration: 2,
});

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
    			message.success('更新成功');
    			this.setState({
    			count:response.object
    			})
    		}else{
    			message.error('更新失败');
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

class SingerCell extends Component{
	constructor(props) {
		super(props);
		this.state={
			songId:this.props.songId,
			singerName:this.props.singerName
		}
		this.handleClick=this.handleClick.bind(this)
	}
	handleClick(songId){
		fetch(context+'/music/song/getLostSinger?songId='+songId,{
    		method:'GET',
    	})
    	.then(response=>response.json())
    	.then(response=>{
    		if(response.code ==200){
    			message.info('找回歌手成功2333');
    			this.setState({
    			singerName:response.object
    			})
    		}else{
    			message.info('找回歌手失败T——T');
    		}
    	})
	}
	componentWillReceiveProps(nextProps){
		this.state ={
			songId:nextProps.songId,
			singerName:nextProps.singerName
		}
	}
	render(){
		const {singerName,songId} =this.state;
		if(singerName==null||singerName==''){
			return(
				<span onClick={()=>this.handleClick(songId)}>
					<i className="fa fa-search"></i>
				</span>
			);
		}else{
			return <span>{singerName}</span>
		}
		
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
			key:'singerName',
			render:(text,record)=><SingerCell songId={record.id} singerName={text}/>
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
	    	current:1,
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
    	visible:this.props.visible,
    	songName:'',
    	singerName:'',
    	albumName:'',
    	cart:this.props.cart
  		}
  		this.handleCancel =this.handleCancel.bind(this)
  		this.fetch =this.fetch.bind(this)
  		this.fetchData =this.fetchData.bind(this)
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
		console.log(params)
    	this.setState({ loading: true });
    	fetch(context+'/music/page',{
    		method:'POST',
    		headers: {
		    	'Content-Type': 'application/json'
		   	},
		   	body:JSON.stringify({
		   		singerName:this.state.singerName,
	    		songName:this.state.songName,
	    		albumName:this.state.albumName,
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
	fetchData(){
		const pager = this.state.pagination ;
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
    	console.log(nextProps)
		this.setState({
			songs:nextProps.songs,
    		autoplay:nextProps.autoplay,
    		visible:nextProps.visible,
    		pagination:nextProps.pagination,
    		cart:nextProps.cart
		});
	}
	render(){
		return (
			<div style={{backgroundColor:'white'}} className="music-chart">
			<h1>评论数排行榜</h1>
			<div style={{margin:'10px'}}>
				<Input placeholder="歌名" style={{width:'200px',marginRight:'10px'}} value={this.state.songName} onChange ={(e)=>this.setState({songName:e.target.value.trim()})}/>
				<Input placeholder="专辑名" style={{width:'200px',marginRight:'10px'}} value={this.state.albumName} onChange ={(e)=>this.setState({albumName:e.target.value.trim()})}/>
				<Input placeholder="歌手名" style={{width:'200px',marginRight:'10px'}} value={this.state.singerName} onChange ={(e)=>this.setState({singerName:e.target.value.trim()})}/>
				<Button type="primary" onClick={this.fetchData}>搜索</Button>
				<Button type="primary" onClick={()=>{console.log(this.state.cart)}}>查看购物车</Button>
			</div>
			<Table columns={this.columns}
		        rowKey="id"
		        dataSource={this.state.data}
		        pagination={this.state.pagination}
		        loading={this.state.loading}
		        onChange={this.handleTableChange}
		      	/>
	      	<Modal
	          title={null}
	          closable ={false}
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
    	visible:state.music.visible,
    	cart:state.cart.cart
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