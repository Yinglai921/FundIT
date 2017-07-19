import { CHANGE_FILTER_STATE } from '../actions/index';

export default function(state = [], action){
    switch(action.type){
        case CHANGE_FILTER_STATE:
            return action.payload;
    }
    return state;
}