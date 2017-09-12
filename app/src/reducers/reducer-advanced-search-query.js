import { SET_ADVANCED_SEARCH_QUERIES } from '../actions/index';

export default function(state = {}, action){
    switch(action.type){
        case SET_ADVANCED_SEARCH_QUERIES:
            return action.payload
    }
    return state;
}