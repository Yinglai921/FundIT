import { CHANGE_COLUMNSETTINGS } from '../actions/index';

export default function(state = {}, action){
    switch(action.type){
        case CHANGE_COLUMNSETTINGS:
            return action.payload;
    }
    return state;
}