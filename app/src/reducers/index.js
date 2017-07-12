import { combineReducers } from 'redux';
import TopicsReducer from './reducer_topics';

const rootReducer = combineReducers({
  topics: TopicsReducer
});

export default rootReducer;
