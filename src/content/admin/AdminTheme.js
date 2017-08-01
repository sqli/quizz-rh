/**
 * Created by nhingan on 11/07/2017.
 */
import React, {Component} from "react";



import AdminListThemes from './theme/AdminListThemes';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ReferentService from '../../services/ReferentService';
import ThemeService from '../../services/ThemeService';
import FABs from 'material-ui/FloatingActionButton';
import IconDone from '../../../node_modules/material-ui/svg-icons/action/done';
import Snackbar from 'material-ui/Snackbar';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Card, CardHeader}from "material-ui/Card";

import "./AdminTheme.css";

const maxLengthName = 25;// 25 is the number max because i have fix the width of the card Theme
const regexLogo = new RegExp("^((http|https)://)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-||=|?)?]+)+$");
class AdminTheme extends Component {


    constructor(props) {

        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreerClick = this.handleCreerClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleReferentClick = this.handleReferentClick.bind(this);

        this.state = {
            showAjout: false,
            themes: [],
            name: '',
            logo: '',
            snackbar: {
                open: false,
                message: ''
            }

        }
    }

    updateThemes() {
        ThemeService.query().then(function (themes) {
            this.setState({themes: themes._embedded.theme});// Chargement des themes à partir du service REST
        }.bind(this));
    }

    componentDidMount() {
        ReferentService.query().then(function (referents) {
            this.setState({referents: referents._embedded.referent});// Chargement des referents à partir du service REST
        }.bind(this));

        this.updateThemes();

        ValidatorForm.addValidationRule('isUrl', (value) => {
            if (regexLogo.test(value)) {
                return true;
            }
            return false;
        });

        ValidatorForm.addValidationRule('isValidName', (value) => {
            if (value.length > maxLengthName) {
                return false;
            } else {
                return true;
            }
        });
    }


    handleChange = (name, value) => {
        this.setState({[name]: value});
    };


    handleReferentClick(referent) {
        this.setState({selectedReferent: referent._links.self.href});

    }

    adminReferent = () => {
        browserHistory.push('/adminReferent');
    }

    handleRefresh() {


    }

    handleCreerClick() {
        this.setState({showAjout: !this.state.showAjout})
    }


    handleSubmit(event) {
        ThemeService.create(this.state);
        this.updateThemes();
        this.setState({
            snackbar: {
                open: true,
                message: 'Le Thème a été creer avec succes !'
            }

        });

    }


    render() {
        return (
            <div>
                <AdminListThemes themes={this.state.themes}></AdminListThemes>
                <div className="creerTheme">
                    <label>Ajouter un thème </label>
                    <br/>
                    <FABs type="fab"
                          mini={true}
                          onClick={this.handleCreerClick}> + </FABs>
                </div>
                {(this.state.showAjout) &&
                <ValidatorForm className="formTheme" ref="form"
                               onSubmit={this.handleSubmit}
                               onError={errors => console.log(errors)}>
                    <div className="formCardTheme">
                        <Card >
                            <CardHeader className="cardHeaderTheme">Création d'un nouveau thème : </CardHeader>

                            <div className="textInputTheme">
                                <TextValidator
                                    floatingLabelText="Nom du theme : "
                                    name="name"
                                    type="text"
                                    fullWidth={true}
                                    value={this.state.name}
                                    onChange={event => this.handleChange('name', event.target.value)}
                                    validators={['required', 'isValidName']}
                                    errorMessages={['Ce champs doit être rempli', 'Vous devez Saisir un nom de thème plus court']}
                                />
                                <br/>
                                <TextValidator
                                    floatingLabelText="URL du logo : "
                                    name="logo"
                                    type="url"
                                    fullWidth={true}
                                    value={this.state.logo}
                                    onChange={event => this.handleChange('logo', event.target.value)}
                                    validators={['required', 'isUrl']}
                                    errorMessages={['Ce champs doit être rempli', 'Vous devez saisir une URL valide']}
                                />
                            </div>
                        </Card>
                    </div>
                    <div className="submitTheme">
                        <FlatButton primary={true}
                                    icon={<IconDone/>}
                                    type="submit"
                        >enregistrer</FlatButton>
                    </div>
                    <Snackbar
                        open={this.state.snackbar.open}
                        message={this.state.snackbar.message}
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}
                        className="snackBar"
                    />

                </ValidatorForm>
                }
            </div>

        );

    }

}

export default AdminTheme;