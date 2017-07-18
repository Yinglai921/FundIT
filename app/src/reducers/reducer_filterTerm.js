import { CHANGE_FILTER_TERM } from '../actions/index';

export default function(state = "", action){
    switch(action.type){
        case CHANGE_FILTER_TERM:
            return action.payload;
    }
    return state;
}