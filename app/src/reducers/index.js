import { combineReducers } from 'redux';
import TopicsReducer from './reducer_topics';
import ScopesReducer from './reducer_scopes';
import FiltersReducer from './reducer_filters';
import SearchTermReducer from './reducer_searchTerm';
import SearchedTopicsReducer from './reducer_searchedTopics';

const rootReducer = combineReducers({
  topics: TopicsReducer,
  scopes: ScopesReducer,
  filters: FiltersReducer,
  searchTerm: SearchTermReducer,
  searchedTopics: SearchedTopicsReducer,
});

export default rootReducer;
