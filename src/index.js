import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

//import App from './App';
import AppStub from './AppStub';

import Login from './content/login/Login';
import Themes from './content/theme/Themes';
import Questions from './content/question/Questions';
import Question from './components/question/Question';
import Results from './content/result/Results';

import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route component={AppStub}>
            <Route path="login" component={Login}/>
            <Route path="themes" component={Themes}/>
            <Route path="question" component={Questions}>
                <Route path=":id" component={Question}/>
            </Route>
            <Route path="result" component={Results}/>
            <Route path="*" component={Login}/>
        </Route>
    </Router>,
  document.getElementById('root')
);