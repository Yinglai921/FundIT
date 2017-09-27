import axios from 'axios';
import topics from '../data/topics.json';

export const FETCH_TOPICS = 'fetch_topics';
export const CHANGE_FILTER_STATE = 'change_filter_state'; 
export const SEARCH_TOPICS = 'search_topics';
export const SET_SEARCH_TERM = 'set_search_term';
export const CHANGE_SEARCH_SCOPE = 'change_search_scope';
export const CHANGE_FILTER_TERM = 'change_filter_term';
export const CHANGE_COLUMNSETTINGS = 'change_columnsettings';
export const SET_FILTER_NUMBER = 'set_filter_number';
export const SET_NAV_TOGGLE = 'set_nav_toggle';
export const SELECT_KEYWORDS = 'select_keywords';
export const SET_COLOR_TOGGLE = 'set_color_toggle';
export const SET_ADVANCED_SEARCH_QUERIES = 'set_advanced_search_queries';
export const ADVANCED_SEARCH_TOPICS = 'advanced_search_topics';
export const FETCH_KEYWORDTREE = 'fetch_keyword_tree';
// fetch all the topics from the start
const TOPICS_URL = 'http://localhost:3001/api/search';
const ADVANCED_SEARCH_URL = 'http://localhost:3001/api/advancedsearch';
const KEYWORDTREE_URL = 'http://localhost:3001/api/keywordtree';

function dateFormatCovert(time){
    let currTime = new Date(time);
    let date = currTime.getDate();
    let month = currTime.getMonth();
    let year = currTime.getFullYear();
    let newTime = `${year}-${month}-${date}`;
    return newTime;
}
export function fetchTopics(){
    //const request = axios.get(TOPICS_URL)
    // cover date to a new format
    let currentTopics = topics;
    currentTopics.forEach((topic) => {
        if(topic.plannedOpeningDate !== null){
            topic.plannedOpeningDate = dateFormatCovert(topic.plannedOpeningDate);
        }
        if(topic.deadlineDates.length !== 0){
            for(let i = 0; i < topic.deadlineDates.length; i++){
                topic.deadlineDates[i] = dateFormatCovert(topic.deadlineDates[i])
            }
        }     
    })

    return{
        type: FETCH_TOPICS,
        //payload: request
        payload: currentTopics
    }
}

export function fetchKeywordTree(){
    let request = axios.get(KEYWORDTREE_URL);
  
    return{
        type: FETCH_KEYWORDTREE, 
        payload: request
    }
    
}

export function setSearchTerm(term){
    return{
        type: SET_SEARCH_TERM,
        payload: term
    }
}
/* search topics
opics: the whole topic list; 
term: the search input word, string;
scopes: the searched scope ["title", "keywords", "tags"]
*/
export function searchTopics(topics, term, scopes){

    let inTitle = true;
    let inKeywords = true;
    let inTags = true;

    if (scopes.indexOf("title") == -1 ){
        inTitle = false;
    } else{ inTitle = true; }

    if (scopes.indexOf("keywords") == -1 ){
        inKeywords = false;
    } else{ inKeywords = true; }

    if (scopes.indexOf("tags") == -1 ){
        inTags = false;
    } else{ inTags = true; }

    let request = axios.get(`${TOPICS_URL}?q=${term}&intitle=${inTitle}&inkeywords=${inKeywords}&intags=${inTags}`)

    console.log("topics length: " + topics.length)
    console.log("current scope: " + scopes)
    console.log("searched term: " + term)

    return{
        type: SEARCH_TOPICS,
        payload: request
    }
}

// advanced search, only take one parameter "values"
//{ANDquery: String, NOTquery: String, ORquery: String, keywords: bool, tags: bool, title: bool}
export function advancedSearchTopics(values){
    console.log(values);
    
    let request = axios.get(`${ADVANCED_SEARCH_URL}?andquery=${values.ANDquery}&orquery=${values.ORquery}&notquery=${values.NOTquery}&must_title=${values.must_title}&must_keywords=${values.must_keywords}&must_tags=${values.must_tags}&should_title=${values.should_title}&should_keywords=${values.should_keywords}&should_tags=${values.should_tags}&mustnot_title=${values.mustnot_title}&mustnot_keywords=${values.mustnot_keywords}&mustnot_tags=${values.mustnot_tags}}`)

    return{
        type: ADVANCED_SEARCH_TOPICS,
        payload: request
    }

}

export function changeSearchScope(list){
    let scopes = {
        "title": false,
        "keywords": false,
        "tags": false,
        "desc": false
    }
    list.forEach((name) => {           
        scopes[name] = true;
    })

    return{
        type: CHANGE_SEARCH_SCOPE,
        payload: scopes
    }
}

export function changeColumnSettings(list){
    let settings = {
        "callTitle": false,
        "plannedOpeningDate": false,
        "deadlineDates": false,
        "keywords": false,
        "tags": false,
        "mainSpecificProgrammeLevelDesc": false,
        "actions": false
    }
    list.forEach((name) => {
        settings[name] = true;
    })

    return{
        type: CHANGE_COLUMNSETTINGS,
        payload: settings
    }
}

// for connecting '/keywords' with '/'
export function changeFilterTerm(keyword){
    return{
        type: CHANGE_FILTER_TERM,
        payload: keyword
    }
}

export function setFilterNumber(length){
    return{
        type: SET_FILTER_NUMBER,
        payload: length
    }

}

export function setNavigationToggle(toggle){
    return{
        type: SET_NAV_TOGGLE,
        payload: toggle
    }
}

export function selectKeywords(keywordList){
    return{
        type: SELECT_KEYWORDS,
        payload: keywordList
    }
}

export function setColorToggle(toggle){
    return{
        type: SET_COLOR_TOGGLE,
        payload: toggle
    }
}

export function setAdvancedSearchQueries(queries){
    return{
        type: SET_ADVANCED_SEARCH_QUERIES,
        payload: queries
    }
}