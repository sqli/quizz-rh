/**
 * Created by nhingan on 10/07/2017.
 */

import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from "material-ui/TextField"
import { browserHistory } from 'react-router';

import {config} from '../../config.js';

class AdminConnexion extends Component
{
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
        if(this.state.password === config.adminLogin){
            browserHistory.push('/option');
        }
    }

    render() {
        const actions = [
            <TextField
                id="loginAdmin"
                className="admin"
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
                    title="Saisir mot de passe admin : "
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }

}
export default AdminConnexion;