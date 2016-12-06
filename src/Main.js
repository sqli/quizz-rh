import React, { Component } from 'react';

import Login from './content/login/Login';
import Themes from './content/theme/Themes';
import Questions from './content/question/Questions';
import Results from './content/result/Results';

import './Main.css';

class Main extends Component {

    constructor(props) {
        super(props);

        this._state = 'login';
    }

    isState(state){
        return this._state === state;
    }

  render() {
    return (
        <main className="Main">
            {this.isState('login') &&  <Login/>}
            {this.isState('themes') &&  <Themes/>}
            {this.isState('questions') &&  <Questions/>}
            {this.isState('results') &&  <Results/>}
        </main>
    );
  }
}

export default Main;
