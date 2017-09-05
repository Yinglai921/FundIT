import { FETCH_TOPICS, SEARCH_TOPICS, FILTER_OPEN_TOPICS } from '../actions/index';

export default function(state = [], action){
    switch(action.type){
        case SEARCH_TOPICS:
            return action.payload.data;
    }
    return state;
}