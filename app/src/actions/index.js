import axios from 'axios';

export const FETCH_TOPICS = 'fetch_topics';
export const CHANGE_FILTER_STATE = 'change_filter_state'; 
export const SEARCH_TOPICS = 'search_topics';
export const SET_SEARCH_TERM = 'set_search_term';
export const CHANGE_SEARCH_SCOPE = 'change_search_scope';
export const CHANGE_FILTER_TERM = 'change_filter_term';
export const CHANGE_COLUMNSETTINGS = 'change_columnsettings';
export const SET_FILTER_NUMBER = 'set_filter_number';
export const SELECT_KEYWORDS = 'select_keywords';
export const SET_COLOR_TOGGLE = 'set_color_toggle';
export const FETCH_KEYWORDTREE = 'fetch_keyword_tree';
export const AUTH_USER = 'auth_user';
export const DEAUTH_USER = 'deauth_user';
export const AUTH_ERROR = 'auth_error';
export const FETCH_MESSAGE = 'fetch_message';
export const QUERY_SAVED = 'query_saved';
export const QUERY_SAVE_ERROR = 'query_save_error';
export const FETCH_ONE_TOPIC = 'fetch_one_topic';
export const FETCH_CALLS = 'fetch_calls';




// fetch all the topics from the start
const API_ROOT = 'https://fundit.proj.kth.se/api';
// const API_ROOT = 'http://localhost:3001/api';

function dateFormatCovert(time){
    let currTime = new Date(time);
    let date = currTime.getDate();
    let month = currTime.getMonth() + 1; // January is converted to 0
    let year = currTime.getFullYear();
    let newTime = `${year}-${month}-${date}`;
    return newTime;
}


export function fetchKeywordTree(){
    let request = axios.get(`${API_ROOT}/keywordtree`);
  
    return{
        type: FETCH_KEYWORDTREE, 
        payload: request
    }
}

export function fetchOneTopic(_id){
    let request = axios.get(`${API_ROOT}/topics/${_id}`);
    return {
        type: FETCH_ONE_TOPIC,
        payload: request
    }
}

export function fetchCalls(){
    let request = axios.get(`${API_ROOT}/calls`);
    return {
        type: FETCH_CALLS,
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
scopes: the searched scope ["title", "keywords", "tags", "description"]
*/
export function searchTopics(term, scopes, history){

    return function(dispatch){

        let query = {
            term,
            in_title: true,
            in_identifier: true,
            in_keywords: true,
            in_tags: true,
            in_descriptions: true,
            in_open: true
        }
    
        if (scopes.indexOf("title") == -1 )
            query.in_title = false;
        
        if (scopes.indexOf("identifier") == -1 )
            query.in_identifier = false;
    
        if (scopes.indexOf("keywords") == -1 )
            query.in_keywords = false;
    
        if (scopes.indexOf("tags") == -1 )
            query.in_tags = false;
    
        if (scopes.indexOf("description") == -1 )
            query.in_descriptions = false;
    
        if (scopes.indexOf("open") == -1 )
            query.in_open = false;

        axios.post(`${API_ROOT}/search`, query)
            .then(response => {
                response.data.forEach((topic) => {
                    if(topic.plannedOpeningDate !== null){
                        topic.plannedOpeningDate = dateFormatCovert(topic.plannedOpeningDate);
                    }
                    if(topic.deadlineDates.length !== 0){
                        for(let i = 0; i < topic.deadlineDates.length; i++){
                            topic.deadlineDates[i] = dateFormatCovert(topic.deadlineDates[i])
                        }
                    }     
                })
                dispatch({ type: SEARCH_TOPICS, payload: response });
                history.push(`/search?term=${query.term}&title=${query.in_title}&identifier=${query.in_identifier}&keywords=${query.in_keywords}&tags=${query.in_tags}&desc=${query.in_descriptions}&open=${query.in_open}`);
            })
            .catch(() => {
                // if request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}



export function changeSearchScope(list){
    let scopes = {
        "title": false,
        "identifier": false,
        "keywords": false,
        "tags": false,
        "description": false,
        "open": false
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
        "keywords": false,
        "tags": false,
        "mainSpecificProgrammeLevelDesc": false,
        "actions": false,
        "budget": false
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



// ********** all about authentication ***************//

export function signinUser({ email, password }, history){

    return function(dispatch){
        // Submit email and psw to the server
        // {email: email, password: password} = {email, password}
        axios.post(`${API_ROOT}/signin`, { email, password })
            .then(response => {
                // if request is good...
                // -- Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // -- Save the JWT token
                localStorage.setItem('token', response.data.token);
                // -- redirect to the route '/mypage'
                history.push('/mypage');
            })
            .catch(() => {
                // if request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }

}

export function authError(error){
    return{
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser(){
    localStorage.removeItem('token');
    return{ type: DEAUTH_USER };
}

export function signupUser({ email, password }, history){
    return function(dispatch){
        axios.post(`${API_ROOT}/signup`, { email, password })
            .then(response =>{
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/mypage');
            })
            .catch(error => 
                dispatch(authError(error.response.data.error))
            );
    }
}

export function fetchMessage(){
    const request = axios.get(`${API_ROOT}/mypage`, {
        headers: { authorization: localStorage.getItem('token')}
    });

    return {
        type: FETCH_MESSAGE,
        payload: request
    }
}

export function saveUserSearchQueries(queries){

    return function(dispatch){
        queries.forEach((query) => {query.topics = []}); // smaller the request size
        axios.post(`${API_ROOT}/mypage`,{ queries }, {
            headers: { authorization: localStorage.getItem('token')}
        })
            .then(response =>{
                // update the user search query info
                dispatch({ type: QUERY_SAVED, payload:response }) // a string to store the success info
            })
            .catch(error => {
                dispatch({ type: QUERY_SAVE_ERROR, payload:error }) // a string to store the error info
            })
    }   
}