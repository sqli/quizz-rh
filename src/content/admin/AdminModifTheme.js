/**
 * Created by nhingan on 11/07/2017.
 */
import React, {Component} from "react";
import ReferentService from '../../services/ReferentService';
import ThemeService from '../../services/ThemeService';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {Card, CardHeader}from "material-ui/Card";
import FABs from 'material-ui/FloatingActionButton';
import Referent from './../../components/referent/Referent';
import AdminListQuestionTheme from './theme/AdminListQuestionTheme';
import {browserHistory} from 'react-router';
import IconDone from '../../../node_modules/material-ui/svg-icons/action/done';
import FlatButton from 'material-ui/FlatButton';
import  "./AdminModifTheme.css"

const maxLengthName = 25;// 25 is the number max because i have fix the width of the card Theme
const regexLogo = new RegExp("^((http|https)://)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-||=|?)?]+)+$");

class AdminModifTheme extends Component {


    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReferentClick = this.handleReferentClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleQuestionsModified = this.handleQuestionsModified.bind(this);
        this.handleReferentModified = this.handleReferentModified.bind(this);
        this.handleDeletedQuestion = this.handleDeletedQuestion.bind(this);


        this.state = {
            theme: {},
            referents: [],

            snackbar: {
                open: false,
                message: ''
            }
        }
    }

    componentDidMount() {

        ReferentService.query().then(function (referents) {
            //get all the existing referents
            this.setState({referents: referents._embedded.referent});

            //get the id of the theme clicked
            ThemeService.get(this.props.params.id).then(function (theme) {
                this.setState({
                    theme: theme
                });

                //on recupere le numero de la question dans l'url et on exerce un filtre dans la mise a jour pour trouver la premiere question correspondant à ce critère
                if (this.props.params.numQuestion) {
                    this.setState({question: theme.questions.filter(question => question.questionNumber == this.props.params.numQuestion)[0]})
                }
                //get theme's referents
                //if the theme clicked has got a referent this function get all the existing referent and show with a css color
                //who is the theme's referent
                ThemeService.getReferent(this.state.theme).then(function (myReferent) {
                    let referentWithActive = referents._embedded.referent.map(referent => {
                        referent.active = referent._links.self.href === myReferent._links.self.href;
                        return referent;
                    })
                    this.setState({referents: referentWithActive});// Chargement des referents à partir du service REST
                }.bind(this));
            }.bind(this))
        }.bind(this));

        //this function create a new rule in order to verify what is enter in the input of the form
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

    //this function get the url of the referent clicked and update the theme with the new referent
    handleReferentClick(newReferent) {
        let theme = this.state.theme;
        theme.selectedReferent = newReferent._links.self.href;
        let referentWithActive = this.state.referents.map(referent => {
            referent.active = referent._links.self.href === theme.selectedReferent;
            return referent
        })
        this.setState({
            theme: theme,
            referents: referentWithActive
        })
        ThemeService.update(theme);

    }

    //this function update the enter value passed in the input with the new value
    handleChange = (name, value) => {
        var theme = this.state.theme
        theme[name] = value
        this.setState({theme: theme});
    };

    //this function call a new page in order to created a new referent
    adminReferent = () => {
        browserHistory.push('/adminReferent');
    }
    // this function  display a new page called adminQustion and get the ObjectId of the theme who as been choose before
    adminQuestion = () => {
        browserHistory.push('/adminQuestion/' + ThemeService.getId(this.state.theme));
    }

    //this function is called with te register button at the end of the formulaire in order to update all the document modification
    handleSubmit(event) {
        ThemeService.update(this.state.theme);
        this.setState({
            snackbar: {
                open: true,
                message: 'Le Thème a été modifié avec succes !'
            }
        });
    }


    handleReferentModified(referent) {
        let referentSelected = referent._links.self.href
        browserHistory.push('/adminReferent/');
    }

    handleQuestionsModified(question) {
        browserHistory.push('/adminQuestion/' + ThemeService.getId(this.state.theme) + "/" + question.questionNumber);

    }

    handleDeletedQuestion(questionToDelete) {

        let newQuestionList = this.state.theme.questions.filter(question => question.questionNumber != questionToDelete.questionNumber)
        let newTheme = {...this.state.theme, questions: newQuestionList}
        this.setState({
                theme: newTheme
            }
        );
        ThemeService.update(newTheme);
    }

    render() {
        return (
            <div className="adminModifTheme">
                <ValidatorForm className="formModifTheme" ref="form"
                               onSubmit={this.handleSubmit}
                               onError={errors => console.log(errors)}>
                    <Card className="cardFormModifTheme">
                        <CardHeader className="cardHeaderModifTheme">Modifier thème : </CardHeader>

                        <div className="textInputModifTheme">
                            <TextValidator
                                floatingLabelText="Nom du theme : "
                                name="name"
                                type="text"
                                fullWidth={true}
                                value={this.state.theme.name}
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
                                value={this.state.theme.logo}
                                onChange={event => this.handleChange('logo', event.target.value)}
                                validators={['required', 'isUrl']}
                                errorMessages={['Ce champs doit être rempli', 'Vous devez saisir une URL valide']}
                            />
                            <div className="submitModifTheme">
                                <FlatButton primary={true}
                                            icon={<IconDone/>}
                                            type="submit"
                                >enregistrer</FlatButton>
                            </div>
                        </div>
                    </Card>
                </ValidatorForm>

                <div className="listQuestionTheme">
                    <Card className="CardQuestionTheme">
                        <CardHeader className="cardHeaderQuestionTheme">
                            Listes des questions de votre theme:
                        </CardHeader>
                        <AdminListQuestionTheme questions={this.state.theme.questions}
                                                onQuestionModified={this.handleQuestionsModified}
                                                onDeletedQuestion={this.handleDeletedQuestion}></AdminListQuestionTheme>
                        <div className="CreerQuestion">
                            <label>Ajouter une nouvelle Question:</label>
                            <FABs type="fab"
                                  mini={true}
                                  onTouchTap={this.adminQuestion}> + </FABs>
                        </div>
                    </Card>
                </div>

                <div className="formCardThemeChoixReferent">
                    <Card className="cardFormChoixReferentTheme">
                        <CardHeader className="cardHeaderThemeChoixReferent">Choisir un référent pour votre thème
                            :</CardHeader>
                        <p>Le référent selectionné apparaitra en couleur et sera affilié à votre thème</p>
                        {this.state.referents.map((referent, count) =>

                            <Referent active={referent.active} handler={this.handleRefresh} key={count} value={referent}
                                      onClick={event => this.handleReferentClick(referent)}
                                      onReferentModified={this.handleReferentModified}/>,
                        )}
                        <div className="creerReferent">
                            <label>creer un référent :</label>
                            <br/>
                            <FABs type="fab"
                                  mini={true}
                                  onTouchTap={this.adminReferent}> + </FABs>
                        </div>
                    </Card>
                </div>

            </div>

        );
    }

}
export default AdminModifTheme;