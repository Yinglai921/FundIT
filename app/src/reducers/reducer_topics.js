import { FETCH_TOPICS } from '../actions/index';

export default function(state = [], action){
    switch(action.type){
        case FETCH_TOPICS:
            return action.payload;
    }
    return state;
}