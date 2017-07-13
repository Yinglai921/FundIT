import { combineReducers } from 'redux';
import TopicsReducer from './reducer_topics';
import ScopesReducer from './reducer_scopes';
import FiltersReducer from './reducer_filters';
import SearchTerm from './reducer_searchTerm';
import SearchedTopics from './reducer_searchedTopics';

const rootReducer = combineReducers({
  topics: TopicsReducer,
  scopes: ScopesReducer,
  filters: FiltersReducer,
  searchTerm: SearchTerm,
  searchedTopics: SearchedTopics
});

export default rootReducer;
