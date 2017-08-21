import { SELECT_KEYWORDS } from '../actions/index';


export default function(state = [], action){
    switch(action.type){
        case SELECT_KEYWORDS:
            return action.payload;
    }
    return state;
}