import { SET_COLOR_TOGGLE } from '../actions/index';

export default function(state = false, action){
    switch(action.type){
        case SET_COLOR_TOGGLE:
            //console.log(action.payload.data.topics)
            //return action.payload.data.topics;
            return action.payload
    }
    return state;
}