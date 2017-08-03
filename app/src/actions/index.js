import Fuse from 'fuse.js';
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
// fetch all the topics from the start
const TOPICS_URL = 'http://127.0.0.1:5000/fundit/api/topics';

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

export function setSearchTerm(term){
    return{
        type: SET_SEARCH_TERM,
        payload: term
    }
}
/* search topics
opics: the whole topic list; 
term: the search input word, string;
scopes: the searched scope { 'title' : 'false', 'keywords' : 'false'...}
filters: the filters like openTopics, calls { 'opened' : 'false'...}
*/
export function searchTopics(topics, term, scopes, filters, ifCheckbox){


    let currentScopes = []
    if(!ifCheckbox){
            // find keys through scopes, keys = ['title', 'keywords' ...]
        currentScopes = Object.keys(scopes).filter((scope) => {
            return scopes[scope] == true;
        });
    }else{
        currentScopes = scopes;
    }

    console.log("topics length: " + topics.length)
    console.log("current scope: " + currentScopes)
    console.log("searched term: " + term)
    console.log("filters: " + filters)
    


    // search 
    let options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 0,
        maxPatternLength: 60,
        minMatchCharLength: 1,
        keys: currentScopes
    };

    let fuse = new Fuse(topics, options);
    let result = fuse.search(term);
    console.log("search result length: " + result.length)
    
    // filter the search result 

    let currentFilters = filters; //['Open']

    if (currentFilters.length > 0){
        let filteredResult = [];
        currentFilters.forEach((filter) => {
            result.forEach((topic) => {
                if(topic.callStatus == filter){
                    filteredResult.push(topic);
                }
            })
        })
        result = filteredResult;
    }

    console.log("filter result length: " + result.length)
    console.log("")

    return{
        type: SEARCH_TOPICS,
        payload: result
    }
}


// change filters reducer true/false
export function changeFilterState(filters){

    return{
        type: CHANGE_FILTER_STATE,
        payload: filters
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
        "tags": false
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