import { CHANGE_SEARCH_SCOPE } from '../actions/index';

export default function(state = {}, action){
    state = {
        'title' : true,
        'keywords' : false,
        'tags' : false,
        'desc' : false
    }
    switch(action.type){
        case CHANGE_SEARCH_SCOPE:
            
            return action.payload;
    }
    return state;
}