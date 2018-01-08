import { FETCH_ONE_TOPIC } from '../actions/index';


export default function(state = {}, action){
    switch(action.type){
        case FETCH_ONE_TOPIC:
            return action.payload.data;
    }
    return state;
}