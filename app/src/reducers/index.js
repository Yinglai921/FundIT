import { createStore, combineReducers } from 'redux';
import TopicsReducer from './reducer_topics';
import ScopesReducer from './reducer_scopes';
import SearchTermReducer from './reducer_searchTerm';
import SearchedTopicsReducer from './reducer_searchedTopics';
import ColumnSettingsReducer from './reducer_columnSettings';
import FilterNumberReducer from './reducer_filterNumber';
import NavigationToggle from './reducer_navigationToggle';
import SelectedKeywords from './reducer_selectedKeywords';
import ColorToggle from './reducer_colorToggle';
import AdvancedSearchQueries from './reducer-advanced-search-query';
import KeywordTree from './reducer_keywordTree';
import AuthReducer from './reducer_auth';

// import redux-form reducer 
import { reducer as formReducers } from 'redux-form';


const rootReducer = combineReducers({
  topics: TopicsReducer,
  scopes: ScopesReducer,
  searchTerm: SearchTermReducer,
  searchedTopics: SearchedTopicsReducer,
  columnSettings: ColumnSettingsReducer,
  filterNumber: FilterNumberReducer,
  navigationToggle: NavigationToggle,
  selectedKeywords: SelectedKeywords,
  colorToggle: ColorToggle,
  advancedSearchQueries: AdvancedSearchQueries,
  keywordTree: KeywordTree,
  auth: AuthReducer,
  
  form: formReducers // this is for redux-form
});

const store = createStore(rootReducer);
export default rootReducer;
