import React, { Component } from 'react';

import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import {CardHeader} from 'material-ui/Card';


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
            <Drawer
                docked={false}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
            >
                <Subheader>
                    <CardHeader
                        title="RH Quizz"
                    />
                </Subheader>
              <MenuItem>
                  <Link to={'login'}>Recommencer</Link>
              </MenuItem>
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