import { FETCH_MESSAGE, QUERY_SAVED } from '../actions/index';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_MESSAGE:
            //return action.payload.data.topics;
            return action.payload.data
        case QUERY_SAVED:
            return action.payload.data
    }
    return state;
}