import { SET_FILTER_NUMBER, SEARCH_TOPICS } from '../actions/index';

export default function(state = 0, action){
    switch(action.type){
        case SET_FILTER_NUMBER:
            return action.payload;
        case SEARCH_TOPICS:
            console.log(action.payload)
            return action.payload.data.length;
    }
    return state;
}