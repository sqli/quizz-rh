import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import IconDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import './Theme.css';

class Theme extends Component {

    constructor(props){
        super(props);
        this.theme = props.value;
        this.state = {
            snackbar: {
                open: false,
                message: ''
            }
        };
    }

    handleRemove = () => {
        this.setState({
            snackbar: {
                open: true,
                message: 'Le questionnaire ' + this.theme.name + ' a ete enleve'
            }
        });
    };

    handleAdd = () => {
        this.setState({
            snackbar: {
                open: true,
                message: 'Ce questionnaire ' + this.theme.name + ' a ete ajoute'
            }
        });
    };

    render() {
        return (
            <Card className="Theme">
                <CardHeader
                    title={this.theme.name}
                    subtitle={this.theme.questions.length + ' Questions'}
                    avatar={this.theme.logo}
                    />
                <CardActions>
                    <FlatButton
                        label="Enlever"
                        secondary={true}
                        onTouchTap={this.handleRemove}
                        icon={<IconDeleteForever />}/>
                    <FlatButton
                        label="Ajouter"
                        primary={true}
                        onTouchTap={this.handleAdd}
                        icon={<IconAddShoppingCart />}/>
                </CardActions>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    />
            </Card>
        );
    }
}

export default Theme;
