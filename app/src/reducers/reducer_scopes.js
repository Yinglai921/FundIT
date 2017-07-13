import { CHANGE_SEARCH_SCOPE } from '../actions/index';

export default function(state = {}, action){
    switch(action.type){
        case CHANGE_SEARCH_SCOPE:
            
            return action.payload;
    }
    return state;
}