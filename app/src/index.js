import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import './index.css';
import './styles/sidebar.css';
import './styles/font-awesome/css/font-awesome.min.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';
import Index from './containers/index';
import KeywordTree from './components/keyword-tree'
import UserGuide from './containers/user-guide'
import Signin from './containers/auth/signin'
import Signout from './containers/auth/signout'
import Signup from './containers/auth/signup'

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/keywords" component={KeywordTree} />
                    <Route path="/user-guide" component={UserGuide} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signout" component={Signout} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/:search" component={Index} />
                    <Route path="/" component={Index} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    
    ,document.getElementById('root'));
registerServiceWorker();
