import { FETCH_TOPICS, SEARCH_TOPICS, FILTER_OPEN_TOPICS } from '../actions/index';

export default function(state = [], action){
    switch(action.type){
        case FETCH_TOPICS:
            //console.log(action.payload.data.topics)
            //return action.payload.data.topics;
            return action.payload
    }
    return state;
}