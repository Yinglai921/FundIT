import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './index.css';
import './styles/sidebar.css';
import './styles/font-awesome/css/font-awesome.min.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';
import Index from './containers/index';
import KeywordTree from './components/keyword-tree'
import TagsGraph from './components/tags-graph'
import Help from './containers/help'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/keywords" component={KeywordTree} />
                    <Route path="/tags" component={TagsGraph} />
                    <Route path="/help" component={Help} />
                    <Route path="/" component={Index} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    
    ,document.getElementById('root'));
registerServiceWorker();
