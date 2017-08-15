import { SET_NAV_TOGGLE } from '../actions/index';

export default function(state = true, action){
    switch(action.type){
        case SET_NAV_TOGGLE:
            //console.log(action.payload.data.topics)
            //return action.payload.data.topics;
            return action.payload
    }
    return state;
}