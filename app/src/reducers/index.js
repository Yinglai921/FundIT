import { combineReducers } from 'redux';
import TopicsReducer from './reducer_topics';
import ScopesReducer from './reducer_scopes';
import SearchTermReducer from './reducer_searchTerm';
import SearchedTopicsReducer from './reducer_searchedTopics';
import ColumnSettingsReducer from './reducer_columnSettings';
import FilterNumberReducer from './reducer_filterNumber';
import NavigationToggle from './reducer_navigationToggle';
import SelectedKeywords from './reducer_selectedKeywords';
import ColorToggle from './reducer_colorToggle';


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
});

export default rootReducer;
