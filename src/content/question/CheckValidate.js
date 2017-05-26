/**
 * Created by moutaararate on 27/03/2017.
 */

import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from "material-ui/TextField"
import { browserHistory } from 'react-router';
import './CheckValidate.css';
import {config} from '../../config.js';


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class CheckValidate extends Component {
    constructor(props) {
        super(props);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin =  this.handleLogin.bind(this);
        this.state = {
            open: true,
            password: ''
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handlePasswordChange(e){
        this.setState({password: e.target.value});
    };
    handleLogin() {
        if(this.state.password === config.rhLogin){
            browserHistory.push('/result');
        }
    }

    render() {
        const actions = [
            <TextField
                       className="afterValidate"
                       value={this.state.password}
                       onChange={this.handlePasswordChange}
                       type="password">
            </TextField>,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleLogin}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="RH Login"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }
}