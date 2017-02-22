import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDone from 'material-ui/svg-icons/action/done';

import './Login.css';

const minLengthUserName = 6;

class Login extends Component {

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isValid = this.isValid.bind(this);

        this.state = {
            login: ''
        };
    }

    submit(event){
        event.preventDefault();
        browserHistory.push('/themes');
    }

    handleChange(event){
        this.setState({
            login: event.target.value
        });
    }

    isValid(value){
        return value.length > minLengthUserName;
    }

    render() {
        return (
            <form className="Login" onSubmit={this.submit}>
                <TextField
                    value={this.state.login}
                    onChange={this.handleChange}
                    floatingLabelText="Entrez votre nom prénom"
                    fullWidth={true}
                    errorText={!this.isValid(this.state.login) && this.state.login.length > 0 && 'Il faut au moins ' + minLengthUserName + ' lettres pour votre nom et prénom'}
                    />
                <br/>
                <RaisedButton
                    type="submit"
                    label="Démarrer le quizz"
                    secondary={true}
                    fullWidth={true}
                    disabled={!this.isValid(this.state.login)}
                    icon={<ActionDone />}
                    />
            </form>
        );
    }
}

export default Login;
