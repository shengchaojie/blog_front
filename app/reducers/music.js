import {PLAYMUSIC,playMusic,STOPMUSIC,stopMusic} from '../actions'

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

export default music;