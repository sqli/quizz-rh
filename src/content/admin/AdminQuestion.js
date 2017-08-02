/**
 * Created by nhingan on 11/07/2017.
 */
import React, {Component} from "react";
import ThemeService from '../../services/ThemeService';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Card, CardHeader}from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import IconDone from '../../../node_modules/material-ui/svg-icons/action/done';
import IconAdd from '../../../node_modules/material-ui/svg-icons/content/add';
import "./AdminQuestion.css"
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';

const styles = {
    customWidth: {
        width: 150,
    },
};
class AdminQuestion extends Component {

    constructor(props) {
        super(props);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handdleAddResponse = this.handdleAddResponse.bind(this);
        this.handdleAddQuestion = this.handdleAddQuestion.bind(this);


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

    componentDidMount() {
        ThemeService.get(this.props.params.id).then(function (theme) {
            this.setState({theme: theme})
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


    handleSubmit(event) {
        let themeWithQuestion = {
            ...this.state.theme,
            questions: [...this.state.theme.questions, {...this.state.question}]
        };
        ThemeService.update(themeWithQuestion);

        this.setState({
            theme: themeWithQuestion,
            snackbar: {
                open: true,
                message: 'La question a été créer'
            }
        })

    };


    render() {

        const response = [
            <div className="formCardResponse">
                <Card className="cardReponse">
                    <CardHeader className="cardHeaderReponse">Réponses :</CardHeader>
                    {this.state.question.reponses.map((reponse, count) =>
                        <div key={count}>
                            <Card className="cardReponseAjoute">
                                <p>Réponse ajoutée :</p>
                                <CardHeader>{reponse.text}</CardHeader>
                                <CardHeader>{reponse.code}</CardHeader>
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
                            labelPosition="right"
                            value={this.state.reponse.isTrue}
                        />
                    </div>
                    <div className="AddResponse">
                        <FlatButton primary={true}
                                    icon={<IconAdd/>}
                                    onClick={this.handdleAddResponse}>Ajouter une réponse</FlatButton>
                    </div>
                </Card>
            </div>
        ];

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
                                    style={styles.customWidth}>
                                    <option style={styles.customWidth}value={'debutant'} label="debutant"/>
                                    <option style={styles.customWidth}value={'intermediaire'} label="intermediaire"/>
                                    <option style={styles.customWidth} value={'Expérimenter'} label="Expérimenter"/>
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
                        <div>{response}</div>
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