import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import Login from './content/login/Login';
import Themes from './content/theme/Themes';
import Question from './content/question/Question';

import './Main.css';

class Main extends Component {

    constructor(props) {
        super(props);

        this._state = 'themes';
    }

    isState(state){
        return this._state === state;
    }

  render() {
    return (
        <Paper className="Main" zDepth={1}>
            {this.isState('login') &&  <Login/>}
            {this.isState('themes') &&  <Themes/>}
            {this.isState('question') &&  <Question/>}
        </Paper>
    );
  }
}

export default Main;
