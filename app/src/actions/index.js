import Fuse from 'fuse.js';
//const TOPICS_URL = 'http://ec.europa.eu/research/participants/portal/data/call/h2020/topics.json';
import topics from '../data/topics.json';

export const FETCH_TOPICS = 'FETCH_TOPICS';
export const CHANGE_FILTER_STATE = 'CHANGE_FILTER_STATE'; 
export const SEARCH_TOPICS = 'SEARCH_TOPICS';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const CHANGE_SEARCH_SCOPE = 'CHANGE_SEARCH_SCOPE';

// fetch all the topics from the start
export function fetchTopics(){
    return{
        type: FETCH_TOPICS,
        payload: topics
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
export function searchTopics(topics, term, scopes, filters){

    // find keys through scopes, keys = ['title', 'keywords' ...]
    let currentScopes = Object.keys(scopes).filter((scope) => {
        return scopes[scope] == true;
    });

    // search 
    let options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: currentScopes
    };

    let fuse = new Fuse(topics, options);
    let result = fuse.search(term);

    // filter the search result 
    let currentFilters = Object.keys(filters); //['Open']
    currentFilters.forEach((filter) =>{
        if(filters[filter] === false){
            currentFilters.splice(currentFilters.indexOf(filter), 1);
        }
    })

    // currentFilters.filter((filter) =>{
    //     return filters[filter] === true;
    // })

    if (currentFilters.length > 0){
        console.log("filtered")
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
    // if(currentFilters.length > 0){
    //     console.log("filted")
    //     currentFilters.map((filter) => {
    //         return result.filter((topic) => {
    //             if(topic.callStatus == filter){
    //                 console.log("equal")
    //             }
    //             return topic.callStatus == filter;
    //         })
    //     })
    // }
    return{
        type: SEARCH_TOPICS,
        payload: result
    }
}


// change filters reducer true/false
export function changeFilterState(filters, name, state){

    filters[name] = state;

    return{
        type: CHANGE_FILTER_STATE,
        payload: filters
    }
}

export function changeSearchScope(scopes, list){
    list.forEach((name) => {           
        scopes[name] = true;
    })

    return{
        type: CHANGE_SEARCH_SCOPE,
        payload: scopes
    }
}

