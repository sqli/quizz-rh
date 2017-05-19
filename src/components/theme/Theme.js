import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconAddShoppingCart from '../../../node_modules/material-ui/svg-icons/action/add-shopping-cart';
import IconDeleteForever from '../../../node_modules/material-ui/svg-icons/action/delete-forever';

import ThemeService from '../../services/ThemeService';

import './Theme.css';

class Theme extends Component {

    constructor(props){
        super(props);
        this.theme = props.value;
        this.notifyChange = props.onChange;
        this.state = {
            snackbar: {
                open: false,
                message: ''
            }
        };
    }

    handleRemove = () => {
        ThemeService.removeThemeFromBasket(this.theme);
        this.notifyChange();
        this.setState({
            snackbar: {
                open: true,
                message: 'Le questionnaire ' + this.theme.name + ' a été enlevé'
            }
        });
    };

    handleAdd = () => {
        ThemeService.addThemeIntoBasket(this.theme);
        this.notifyChange();
        this.setState({
            snackbar: {
                open: true,
                message: 'Le questionnaire ' + this.theme.name + ' a été ajouté'
            }
        });
    };

    render() {

        return (
            <Card className="Theme" style={{backgroundColor: ThemeService.themeIsIntoBasket(this.theme) ? 'lightBlue': 'white'}}>
                <CardHeader
                    title={this.theme.name}
                    titleStyle={{'lineHeight': '2.8em'}}
                    avatar={this.theme.logo}
                    />
                <CardTitle title={this.theme.questions.length + ' Questions'} />
                <CardHeader
                    subtitle={this.theme.referent.firstName + ' ' + this.theme.referent.lastName}
                    avatar={this.theme.referent.avatar}
                    />
                <CardActions>
                    {
                        ThemeService.themeIsIntoBasket(this.theme)   &&
                        <FlatButton
                            label="Enlever"
                            secondary={true}
                            onTouchTap={this.handleRemove}
                            icon={<IconDeleteForever />}/>
                    }
                    {
                        !ThemeService.themeIsIntoBasket(this.theme) &&
                        <FlatButton
                            label="Ajouter"
                            primary={true}
                            onTouchTap={this.handleAdd}
                            icon={<IconAddShoppingCart />}/>
                    }
                </CardActions>

                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                    className="snackBar"
                    />
            </Card>
        );
    }
}

export default Theme;
