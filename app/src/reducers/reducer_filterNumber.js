import { SET_FILTER_NUMBER } from '../actions/index';

export default function(state = 0, action){
    switch(action.type){
        case SET_FILTER_NUMBER:
            return action.payload;
    }
    return state;
}