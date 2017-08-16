import {DISPLAYPIC,HIDEPIC,PAGEPICS} from '../actions'


function upload(state={
	imgVisiable:false,
},action){
	switch(action.type){
		case DISPLAYPIC:
			return {
				imgVisiable:true,
				imgUrl:action.imgUrl
			}
		case HIDEPIC:
			return {
				imgVisiable:false,
				imgUrl:''
			}
		
		default:
			return state;
	}
}

function uploadInfo(state={
	data:[],
	total:0
},action){
	switch(action.type){
		case PAGEPICS:
			return{
				data:action.data,
				total:action.total
			}
		default:
			return state;
	}
}

export  {upload ,uploadInfo}