import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDone from 'material-ui/svg-icons/action/done';

import './Login.css';

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
        console.log(this.state.login)
    }

    handleChange(event){
        this.setState({
            login: event.target.value
        });
    }

    isValid(value){
        return value.length > 10;
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <TextField
                    value={this.state.login}
                    onChange={this.handleChange}
                    floatingLabelText="Entrez votre nom prenom"
                    fullWidth={true}
                    errorText={!this.isValid(this.state.login) && this.state.login.length > 0 && "Il faut au moins 10 lettres pour votre nom et prenom"}
                    />
                <br/>
                <RaisedButton
                    type="submit"
                    label="Start quizz"
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
