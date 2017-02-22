import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import IconDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import ThemeService from './ThemeService';

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
                    avatar={this.theme.logo}
                    />
                <CardTitle title={this.theme.questions.length + ' Questions'} />
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
                    />
            </Card>
        );
    }
}

export default Theme;
