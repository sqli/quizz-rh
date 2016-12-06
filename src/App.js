import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import Main from './Main';
import Footer from './Footer';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  }


  render() {
    return (
        <MuiThemeProvider>
          <div>
            <AppBar
                title="RH Quizz"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                />
            <Drawer open={this.state.open} openSecondary={true}>
              <MenuItem>A propos</MenuItem>
            </Drawer>
            <Main/>
            <Footer/>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;