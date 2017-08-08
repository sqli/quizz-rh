import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, browserHistory} from 'react-router';

import App from './App';
//import App from './AppStub';

import Login from './content/login/Login';
import Themes from './content/theme/Themes';
import Questions from './content/question/Questions';
import Question from './components/question/Question';
import Results from './content/result/Results';
import CheckValidate from './content/question/CheckValidate';
import AdminConnexion from './content/login/AdminConnexion';
import OptionAdmin from './content/admin/OptionAdmin';
import AdminTheme from './content/admin/AdminTheme';
import AdminQuestion from './content/admin/AdminQuestion';
import AdminModifTheme from './content/admin/AdminModifTheme';
import AdminReferent from './content/admin/AdminReferent';
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="login" component={Login}/>
            <Route path="themes" component={Themes}/>
            <Route path="question" component={Questions}>
                <Route path=":id" component={Question}/>
            </Route>
            <Route path="result" component={Results}/>
            <Route path="check" component={CheckValidate}/>
            <Route path="admin" component={AdminConnexion}/>
            <Route path="option" component={OptionAdmin}/>
            <Route path="adminTheme" component={AdminTheme}/>
            <Route path="adminModifTheme/:id" component={AdminModifTheme}/>
            <Route path="adminQuestion/:id/:numQuestion" component={AdminQuestion}/>
            <Route path="adminQuestion/:id" component={AdminQuestion}/>
            <Route path="adminReferent" component={AdminReferent}/>
            <Route path="adminReferent/:id" component={AdminReferent}/>


            <Route path="*" component={Login}/>
        </Route>
    </Router>,
    document.getElementById('root')
);