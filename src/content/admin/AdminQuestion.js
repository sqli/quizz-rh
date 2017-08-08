/**
 * Created by nhingan on 11/07/2017.
 */
import React, {Component} from "react";
import ThemeService from '../../services/ThemeService';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Card, CardHeader}from "material-ui/Card";
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import IconDone from '../../../node_modules/material-ui/svg-icons/action/done';
import IconAdd from '../../../node_modules/material-ui/svg-icons/content/add';
import "./AdminQuestion.css"
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';


class AdminQuestion extends Component {

    constructor(props) {
        super(props);

        //We make the binding for functions
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handdleAddResponse = this.handdleAddResponse.bind(this);
        this.handdleAddQuestion = this.handdleAddQuestion.bind(this);
        this.handleToggle = this.handleToggle.bind(this);

        this.state = {

            theme: {},
            question: {
                questionNumber: '',
                level: '',
                title: '',
                code: '',
                reponses: [],

            },
            reponse: {
                text: '',
                code: '',
                isTrue: false,
            },

            snackbar: {
                open: false,
                message: ''
            }

        }
    }

    //We get all the existing theme
    componentDidMount() {
        ThemeService.get(this.props.params.id).then(function (theme) {
            this.setState({theme: theme})
            if (this.props.params.numQuestion) {
                this.setState({question: theme.questions.filter(questionrecherche => (questionrecherche.questionNumber).toString() === this.props.params.numQuestion)[0]})
            }
        }.bind(this));
    }

    handleThemeClick(theme) {
        this.setState({selectedTheme: theme._links.self.href});
    }

    handleReponseChange = (key, value) => {
        let reponse = this.state.reponse;
        reponse[key] = value;
        this.setState({reponse: reponse});
    };

    handleQuestionChange = (key, value) => {
        let question = this.state.question;
        question[key] = value;
        this.setState({question: question});
    };


    handleToggle = (event, toggle) => {
        this.setState({reponse:{isTrue: toggle}});
    };

    // Creer le handleAdd
    handdleAddQuestion() {
        this.setState({
            theme: {
                ...this.state.theme,
                questions: [...this.state.theme.questions, {...this.state.question}]
            }
        });
    }

    handdleAddResponse() {
        this.setState({
            question: {
                ...this.state.question,
                reponses: [...this.state.question.reponses, {...this.state.reponse}]
            }

        });
    }

    getId(theme) {
        return ThemeService.getId(theme)
    }

    adminModifTheme =() =>{
        browserHistory.push('adminModifTheme/' + this.getId(this.state.theme))
    }
    handleSubmit(event) {

        var questionNumber = this.state.theme.questions.filter(question => question.questionNumber === (this.state.question.questionNumber))
        if (questionNumber.length === 0) {
            //creation
            let themeWithQuestion = {
                ...this.state.theme,
                questions: [...this.state.theme.questions, {...this.state.question}]
            };
            ThemeService.update(themeWithQuestion);
            this.setState({
                theme: themeWithQuestion,
                snackbar: {
                    open: true,
                    message: 'La question a été crée',

                },

            })
            setTimeout(this.adminModifTheme, 1500);

        } else {
            //modification
            let unmodifiedQuestionList = this.state.theme.questions.filter(question => question.questionNumber !== this.state.question.questionNumber)
            //let newTheme = {...this.state.theme, questions: newQuestionList}
            //this.setState({
            //        theme: newTheme
            //    }
           // );
            //ThemeService.update(newTheme);

            let newTheme = {
                ...this.state.theme,
                questions: [...unmodifiedQuestionList, {...this.state.question}]
            }

            //Sauvegarde coté server
            ThemeService.update(newTheme);

            //Modification client
            this.setState({
                theme: newTheme,
                snackbar: {
                    open: true,
                    message: 'La question a été modifiée'
                }
            })
            setTimeout(this.adminModifTheme, 1500);
        }


    };


    render() {



        return (
            <ValidatorForm className="formQuestion" ref="form"
                           onSubmit={this.handleSubmit}
                           onError={errors => console.log(errors)}>
                <div className="formCardQuestion">
                    <Card>
                        <CardHeader> Créer une question :</CardHeader>
                        <div className="textInputQuestion">
                            <TextValidator
                                floatingLabelText="Saisir le numéro de la question : "
                                name="questionNumber"
                                type="number"
                                fullWidth={false}
                                value={this.state.question.questionNumber}
                                onChange={event => this.handleQuestionChange('questionNumber', event.target.value)}
                                validators={['required']}
                                errorMessages={['Ce champs doit être rempli']}/>
                            <br/>
                            <div className="selectedLevel">
                                <SelectField
                                    floatingLabelText="Choix du niveau"
                                    value={this.state.question.level}
                                    onChange={event => this.handleQuestionChange('level', event.target.value)}
                                >
                                    <option value={'Débutant'} label="debutant"/>
                                    <option value={'Intermediaire'} label="intermediaire"/>
                                    <option value={'Expérimenter'} label="Expérimenter"/>
                                </SelectField>
                            </div>
                            <TextValidator
                                floatingLabelText="Saisir le texte de la question : "
                                name="title"
                                type="text"
                                fullWidth={true}
                                value={this.state.question.title}
                                onChange={event => this.handleQuestionChange('title', event.target.value)}
                                validators={['required']}
                                errorMessages={['Ce champs doit être rempli']}/>
                            <br/>
                            <TextValidator
                                floatingLabelText="Saisir le code de la question : "
                                name="code"
                                type="text"
                                fullWidth={true}
                                value={this.state.question.code}
                                onChange={event => this.handleQuestionChange('code', event.target.value)}/>
                        </div>
                        <div><div className="formCardResponse">
                            <Card className="cardReponse">
                                <CardHeader className="cardHeaderReponse">Réponses :</CardHeader>
                                {this.state.question.reponses.map((reponse, index) =>
                                    <div key={index}>
                                        <Card className="cardReponseAjoute">
                                            <p>Réponse ajoutée :</p>
                                            <CardHeader>{reponse.text}</CardHeader>
                                            <CardHeader>{reponse.code}</CardHeader>
                                            <CardHeader>{reponse.isTrue?"Bonne réponse : oui ":"Bonne réponse : non"}</CardHeader>
                                        </Card>
                                    </div>)}
                                <div className="textInputResponse">
                                    <TextValidator
                                        floatingLabelText="Saisir le texte de la réponse : "
                                        name="text"
                                        type="text"
                                        fullWidth={true}
                                        value={this.state.reponse.text}
                                        onChange={event => this.handleReponseChange('text', event.target.value)}/>
                                    <TextValidator
                                        floatingLabelText="Saisir le code de la reponse : "
                                        name="code"
                                        type="text"
                                        fullWidth={true}
                                        value={this.state.reponse.code}
                                        onChange={event => this.handleReponseChange('code', event.target.value)}/>
                                    <Toggle
                                        label="Es-ce la bonne réponse?"
                                        toggled={this.state.reponse.isTrue}
                                        onToggle={this.handleToggle}
                                        labelPosition="right"
                                        defaultToggled={false}
                                        onChange={event => this.handleReponseChange('isTrue', event.target.value)}

                                    />
                                </div>
                                <div className="AddResponse">
                                    <FlatButton primary={true}
                                                icon={<IconAdd/>}
                                                onClick={this.handdleAddResponse}>Ajouter la réponse</FlatButton>
                                </div>
                            </Card>
                        </div></div>
                    </Card>
                </div>

                <div className="submitQuestion">
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

        );
    }


}
export default AdminQuestion;