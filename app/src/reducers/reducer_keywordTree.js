

import { FETCH_KEYWORDTREE } from '../actions/index';

export default function(state = [], action){
    switch(action.type){
        case FETCH_KEYWORDTREE:
            //console.log(action.payload.data.topics)
            //return action.payload.data.topics;
            return action.payload.data[0]
    }
    return state;
}

