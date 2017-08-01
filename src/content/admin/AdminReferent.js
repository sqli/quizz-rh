/**
 * Created by nhingan on 13/07/2017.
 */
import React, {Component} from "react";
import ReferentService from '../../services/ReferentService';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import IconDone from '../../../node_modules/material-ui/svg-icons/action/done';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Card, CardHeader}from "material-ui/Card";
import "./AdminReferent.css";

const maxLengthName = 18;
const regexAvatar = new RegExp("^((http|https)://)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-||=|?)?]+)+$");
const regexSpecialChar=new RegExp("[a-zA-Z]*[a-z A-Z]");///regex a revoirr !!!!!
class AdminReferent extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            avatar: '',
            snackbar: {
                open: false,
                message: ''
            }

        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isUrl', (value) => {
            if (regexAvatar.test(value)) {
                return true;
            }
            return false;
        });
        ValidatorForm.addValidationRule('isValidNameLength', (value) => {
            if (value.length > maxLengthName) {
                return false;
            } else {
                return true;
            }
        });
        ValidatorForm.addValidationRule('isValidNameInput', (value) => {
            if (regexSpecialChar.test(value)) {
                return true;
            }
            return false;
        });

    }

    //this function take into account what the user whrite in the input field event and update the state
    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    //this function save in Mongodb a new referent and print a message in order to informed the user about this action and update the state
    handleSubmit(event) {

        ReferentService.save(this.state)
        this.setState({
            snackbar: {
                open: true,
                message: 'Le référent  a été ajouté'
            }
        });


    }



    render() {
        return (


            <ValidatorForm className="formReferent"
                           onSubmit={this.handleSubmit}
                           onError={errors => console.log(errors)}
            >
                <Card className="formCardReferent">
                    <CardHeader className="cardHeaderReferent"> Création d'un nouveau référent:</CardHeader>

                    <div className="textInputReferent">
                        <TextValidator
                            floatingLabelText="Prénom du Référent :"
                            name="firstName"
                            type="text"
                            fullWidth={true}
                            value={this.state.firstName}
                            onChange={event => this.handleChange('firstName', event.target.value)}
                            validators={['required','isValidNameLength','isValidNameInput']}
                            errorMessages={['Ce champs doit être rempli','Le prénom saisi est trop long ...','Un prénom ne peut pas commencer par un caractère spécial...']}
                        />
                        <br/>
                        <TextValidator
                            floatingLabelText="Nom du Référent :"
                            name="lastName"
                            type="text"
                            fullWidth={true}
                            value={this.state.lastName}
                            onChange={event => this.handleChange('lastName', event.target.value)}
                            validators={['required','isValidNameLength','isValidNameInput']}
                            errorMessages={['Ce champs doit être rempli','Le nom saisi est trop long ...','Un prénom ne peut pas commencer par un caractère spécial...']}
                        />
                        <br/>
                        <TextValidator
                            floatingLabelText="URL de son avatar :"
                            name="avatar"
                            type="url"
                            fullWidth={true}
                            value={this.state.avatar}
                            onChange={event => this.handleChange('avatar', event.target.value)}
                            validators={['required', 'isUrl']}
                            errorMessages={['Ce champs doit être rempli', 'Vous devez saisir une URL valide']}
                        />
                    </div>
                    <div className="submitReferent">
                        <FlatButton
                                    primary={true}
                                    icon={<IconDone/>}
                                    type="submit">enregistrer</FlatButton>
                    </div>

                </Card>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                    className="snackBar"
                />
            </ValidatorForm>

        );
    }


}
export default AdminReferent;