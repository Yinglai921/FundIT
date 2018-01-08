import { FETCH_CALLS } from '../actions/index';


export default function(state = {}, action){
    switch(action.type){
        case FETCH_CALLS:
            return action.payload.data[0];
    }
    return state;
}