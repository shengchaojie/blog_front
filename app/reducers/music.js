import {PLAYMUSIC,playMusic,STOPMUSIC,stopMusic,ADDTOCART} from '../actions'
var uniqs =reuqire('uniqs')

function music(state={
	visible:false,
	songs:[],
	autoplay:false
},action){
	switch(action.type){
		case PLAYMUSIC:
			return {
				songs: action.songs.concat(state.songs),
    			autoplay:action.autoplay,
    			visible:action.visible
			}
		case STOPMUSIC:
			return {
				songs:state.songs,
    			autoplay:action.autoplay,
    			visible:action.visible
			}
		default:
			return state
	}
}

function cart(state={
	cart:[]
},action){
	switch(action.type){
		case ADDTOCART:
			return {
				cart :uniqs(action.song,this.state.cart)
			}
		default:
			return state
	}
}

export {music,cart};