import React, { Component } from 'react';

import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

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
                <Link to={'login'}>
                  <MenuItem>
                      Recommencer
                  </MenuItem>
                </Link>
            </Drawer>
            <main>
                {this.props.children}
            </main>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;