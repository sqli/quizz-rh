/**
 * Created by nhingan on 11/07/2017.
 */
import React, {Component} from "react";
import ThemeService from '../../services/ThemeService';
import QuestionService from '../../services/QuestionService'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Card, CardHeader}from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import IconDone from '../../../node_modules/material-ui/svg-icons/action/done';
import IconAdd from '../../../node_modules/material-ui/svg-icons/content/add';
import "./AdminQuestion.css"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';


class AdminQuestion extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handdleAddResponse = this.handdleAddResponse.bind(this);


        this.state = {
            theme: {},
            //questions:[],
            /*
            * question:{
            *  questionNumber: '',
             level: '',
             title: '',
             code: '',
             reponses: [],
            * }
            * */
            questionNumber: '',
            level: '',
            title: '',
            code: '',
            reponses: [],
            reponse: {
                text: '',
                code: '',
                isTrue: false
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


    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    handleReponseChange = (key, value) => {
        let reponse = this.state.reponse;
        reponse[key] = value;
        this.setState({reponse: reponse});
    };

  /*  handleQuestionChange = (key, value) => {
        let question = this.state.question;
        question[key] = value;
        this.setState({question : question});
    };
*/

    handleChangeSelect = (event, index, value) => this.setState({value});

    // Creer le handleAdd
   /* handdleAddQuestion(){
        this.setState({theme.questions: [...this.state.theme.questions, {...this.state.question}]});
    }
    */
    handdleAddResponse() {
        this.setState({reponses: [...this.state.reponses, {...this.state.reponse}]});
    }


    handleSubmit(event) {
      /*QuestionService.save(this.state).then(question => {
           //On recupere les questions deja existantes
            ThemeService.getQuestions(this.state.theme).then(questionsTheme => {
                let listQuestions = questionsTheme._embedded.question
                let questionsLink = [];
                listQuestions.forEach(question => {
                   questionsLink.push( "/question/" + QuestionService.getId(question.data._links.self.href))
                })
                //le lien de la nouvelle question :
                questionsLink.push("/question/" + QuestionService.getId(question.data._links.self.href))
                this.state.theme.questions = questionsLink;
                ThemeService.update(this.state.theme);
            });
      });
        QuestionService.save(this.state).then(question => {

            //let existingQuestion = ThemeService.getQuestions(this.state.theme) ;
            //le lien de la nouvelle question :
            this.state.theme.questions = ["/question/" + QuestionService.getId(question.data._links.self.href)];
            ThemeService.update(this.state.theme);
        });
       */


        this.setState({
            snackbar: {
                open: true,
                message: 'La question a été créer'
            }
        })

    };


    render() {
        const items = [
            <MenuItem key={1} value={this.state.level} primaryText="Débutant"/>,
            <MenuItem key={2} value={this.state.level} primaryText="Intermédiaire"/>,
            <MenuItem key={3} value={this.state.level} primaryText="Expérimenter"/>
        ];
        const response = [
            <div className="formCardResponse">
                <Card className="cardReponse">
                    <CardHeader className="cardHeaderReponse">Réponses :</CardHeader>
                    {this.state.reponses.map(reponse => <div>
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
                                value={this.state.questionNumber}
                                onChange={event => this.handleChange('questionNumber', event.target.value)}
                                validators={['required']}
                                errorMessages={['Ce champs doit être rempli']}/>
                            <br/>
                            <SelectField value={this.state.value}
                                         onChange={event => this.handleChangeSelect(event, event.target.key, event.target.value)}
                                         floatingLabelText="Choisir un niveau :"
                            >{items}
                            </SelectField>
                            <TextValidator
                                floatingLabelText="Saisir le texte de la question : "
                                name="title"
                                type="text"
                                fullWidth={true}
                                value={this.state.title}
                                onChange={event => this.handleChange('title', event.target.value)}
                                validators={['required']}
                                errorMessages={['Ce champs doit être rempli']}/>
                            <br/>
                            <TextValidator
                                floatingLabelText="Saisir le code de la question : "
                                name="code"
                                type="text"
                                fullWidth={true}
                                value={this.state.code}
                                onChange={event => this.handleChange('code', event.target.value)}/>
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

    /* choix du thème:
     render2() {
     return (
     <div className="ChoixThemeQuestion">
     <div className="ThemeQuestion">
     <h3>Choisir votre theme : </h3>
     <div>
     {this.state.themes.map((theme, count) =>
     <Theme key={count} value={theme} onClick={event => this.handleThemeClick(theme)}/>
     )}
     </div>
     <FlatButton label="Suivant"
     primary={true}
     icon={<IconDone/>}
     onClick={this.handleNext}/>
     </div>
     </div>
     );
     }*/
}
export default AdminQuestion;