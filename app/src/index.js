import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import './index.css';
import './styles/sidebar.css';
import './styles/font-awesome/css/font-awesome.min.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';
import { AUTH_USER } from './actions/index'

import Index from './containers/index';
import KeywordTree from './components/keyword-tree'
import UserGuide from './containers/user-guide'
import Signin from './containers/auth/signin'
import Signout from './containers/auth/signout'
import Signup from './containers/auth/signup'
import MyPage from './containers/auth/mypage'
import RequireAuth from './containers/auth/require_auth'
import TopicDetail from './containers/topic-detail'

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if we have a token, consider the user to be signed in
if (token) {
    // we need to update application state
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Switch>
                    <Route path="/keywords" component={KeywordTree} />
                    <Route path="/user-guide" component={UserGuide} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signout" component={Signout} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/mypage" component={RequireAuth(MyPage)} />
                    <Route path="/topics/:id" component={TopicDetail} />
                    <Route path="/:search" component={Index} />
                    <Route path="/" component={Index} />
                </Switch>
            </div>
        </HashRouter>
    </Provider>
    
    ,document.getElementById('root'));
registerServiceWorker();
