import { createStore, combineReducers } from 'redux';
import ScopesReducer from './reducer_scopes';
import SearchTermReducer from './reducer_searchTerm';
import SearchedTopicsReducer from './reducer_searchedTopics';
import ColumnSettingsReducer from './reducer_columnSettings';
import FilterNumberReducer from './reducer_filterNumber';
import SelectedKeywords from './reducer_selectedKeywords';
import ColorToggle from './reducer_colorToggle';
import KeywordTree from './reducer_keywordTree';
import AuthReducer from './reducer_auth';
import UserReducer from './reducer_user';

// import redux-form reducer 
import { reducer as formReducers } from 'redux-form';


const rootReducer = combineReducers({
  scopes: ScopesReducer,
  searchTerm: SearchTermReducer,
  searchedTopics: SearchedTopicsReducer,
  columnSettings: ColumnSettingsReducer,
  filterNumber: FilterNumberReducer,
  selectedKeywords: SelectedKeywords,
  colorToggle: ColorToggle,
  keywordTree: KeywordTree,
  auth: AuthReducer,
  user: UserReducer,
  
  form: formReducers // this is for redux-form
});

const store = createStore(rootReducer);
export default rootReducer;
