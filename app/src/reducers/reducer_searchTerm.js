import { SET_SEARCH_TERM, CHANGE_FILTER_TERM } from '../actions/index';

export default function(state = "", action){
    switch(action.type){
        case SET_SEARCH_TERM:
            return action.payload;
        case CHANGE_FILTER_TERM:
            return action.payload;
    }
    return state;
}