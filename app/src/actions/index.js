import Fuse from 'fuse.js';
//const TOPICS_URL = 'http://ec.europa.eu/research/participants/portal/data/call/h2020/topics.json';
import topics from '../data/topics.json';

export const FETCH_TOPICS = 'FETCH_TOPICS'; 

export function fetchTopics(keywords){
    //const request = axios.get(TOPICS_URL);
    
    let options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["title"]
    }
    let fuse = new Fuse(topics, options);
    let result = fuse.search(keywords);

    console.log(result)
    return{
        type: FETCH_TOPICS,
        payload: result
    }

}