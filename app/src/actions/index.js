import Fuse from 'fuse.js';
//const TOPICS_URL = 'http://ec.europa.eu/research/participants/portal/data/call/h2020/topics.json';
import topics from '../data/topics.json';

export const FETCH_TOPICS = 'FETCH_TOPICS';
export const FILTER_OPEN_TOPICS = 'FILTER_OPEN_TOPICS'; 


let searchedResult = [];

export function fetchTopics(keywords, keys){
    //const request = axios.get(TOPICS_URL);
    if (keys == []){
        alert("please select at least one scope");
        return
    }else{
        let options = {
            shouldSort: true,
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: keys
        }
        let fuse = new Fuse(topics, options);
        let result = fuse.search(keywords);
        let searchedResult = result;

        return{
            type: FETCH_TOPICS,
            payload: result
        }
    }
}

export function filterOpenTopics(topics,state){
    let filterResult = [];
    if(state){
        topics.forEach((topic) => {
          if(topic.callStatus == "Open"){
            filterResult.push(topic);
          }
        })
    }else{
      filterResult = topics;
    }
    return{
        type: FILTER_OPEN_TOPICS,
        payload: filterResult
    }
}


