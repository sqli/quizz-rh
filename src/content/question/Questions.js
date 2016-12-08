import React, { Component } from 'react';

import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import './Questions.css';

class Questions extends Component {

    constructor(props){
        super();
        this.state = {
            stepIndex: 0,
            completed: 8,
            questions: props.value || [{
                    "theme": {
                        "id": 1,
                        "name": "HTML",
                        "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
                    },
                "title": "Quelle est l'erreur dans le code suivant",
                "code": "<ul>\n\t<il></il>\n\t<il></il>\n\t<il></il>\n</ul>",
                "responses": [{
                    "title": "il faut numéroter chaque objet de la liste"
                },{
                    "title": "il n�y a pas d�erreur"
                },{
                    "title": "la balise <ul> n'a pas besoin d'être fermée"
                },{
                    "title": "la balise <il> n'existe pas",
                    "isTrue": true
                }]
        },{
                "theme": {
                    "id": 1,
                    "name": "HTML",
                    "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
                },
                "title": "Quelle est l�erreur dans le code suivant",
                "code": "<ul>\n\t<il></il>\n\t<il></il>\n\t<il></il>\n</ul>",
                "responses": [{
                    "title": "il faut num�roter chaque objet de la liste"
                },{
                    "title": "il n�y a pas d�erreur"
                },{
                    "title": "la balise <ul> n�a pas besoin d��tre ferm�e"
                },{
                    "title": "la balise <il> n�existe pas",
                    "isTrue": true
                }]
            },{
                "theme": {
                    "id": 1,
                    "name": "HTML",
                    "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
                },
                "title": "Quelle est l�erreur dans le code suivant",
                "code": "<ul>\n\t<il></il>\n\t<il></il>\n\t<il></il>\n</ul>",
                "responses": [{
                    "title": "il faut num�roter chaque objet de la liste"
                },{
                    "title": "il n�y a pas d�erreur"
                },{
                    "title": "la balise <ul> n�a pas besoin d��tre ferm�e"
                },{
                    "title": "la balise <il> n�existe pas",
                    "isTrue": true
                }]
            },{
                "theme": {
                    "id": 1,
                    "name": "HTML",
                    "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
                },
                "title": "Quelle est l�erreur dans le code suivant",
                "code": "<ul>\n\t<il></il>\n\t<il></il>\n\t<il></il>\n</ul>",
                "responses": [{
                    "title": "il faut num�roter chaque objet de la liste"
                },{
                    "title": "il n�y a pas d�erreur"
                },{
                    "title": "la balise <ul> n�a pas besoin d��tre ferm�e"
                },{
                    "title": "la balise <il> n�existe pas",
                    "isTrue": true
                }]
            },{
                "theme": {
                    "id": 1,
                    "name": "HTML",
                    "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
                },
                "title": "Quelle est l�erreur dans le code suivant",
                "code": "<ul>\n\t<il></il>\n\t<il></il>\n\t<il></il>\n</ul>",
                "responses": [{
                    "title": "il faut num�roter chaque objet de la liste"
                },{
                    "title": "il n�y a pas d�erreur"
                },{
                    "title": "la balise <ul> n�a pas besoin d��tre ferm�e"
                },{
                    "title": "la balise <il> n�existe pas",
                    "isTrue": true
                }]
            },{
                "theme": {
                    "id": 1,
                    "name": "HTML",
                    "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
                },
                "title": "Quelle est l�erreur dans le code suivant",
                "code": "<ul>\n\t<il></il>\n\t<il></il>\n\t<il></il>\n</ul>",
                "responses": [{
                    "title": "il faut num�roter chaque objet de la liste"
                },{
                    "title": "il n�y a pas d�erreur"
                },{
                    "title": "la balise <ul> n�a pas besoin d��tre ferm�e"
                },{
                    "title": "la balise <il> n�existe pas",
                    "isTrue": true
                }]
            },{
                "theme": {
                    "id": 1,
                    "name": "HTML",
                    "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
                },
                "title": "Quelle est l�erreur dans le code suivant",
                "code": "<ul>\n\t<il></il>\n\t<il></il>\n\t<il></il>\n</ul>",
                "responses": [{
                    "title": "il faut num�roter chaque objet de la liste"
                },{
                    "title": "il n�y a pas d�erreur"
                },{
                    "title": "la balise <ul> n�a pas besoin d��tre ferm�e"
                },{
                    "title": "la balise <il> n�existe pas",
                    "isTrue": true
                }]
            },{
                "theme": {
                    "id": 1,
                    "name": "HTML",
                    "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
                },
                "title": "Quelle est l�erreur dans le code suivant",
                "code": "<ul>\n\t<il></il>\n\t<il></il>\n\t<il></il>\n</ul>",
                "responses": [{
                    "title": "il faut num�roter chaque objet de la liste"
                },{
                    "title": "il n�y a pas d�erreur"
                },{
                    "title": "la balise <ul> n�a pas besoin d��tre ferm�e"
                },{
                    "title": "la balise <il> n�existe pas",
                    "isTrue": true
                }]
            }]
        };
    }

    next = () => {
        const {stepIndex} = this.state;
        if (stepIndex < this.state.questions.length) {
            this.setState({stepIndex: stepIndex + 1});
        }
    };

    back = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    render() {
        return (
            <div>
                <div className="content-with-paper">
                    <div className="Questions-stepper">
                        <Stepper
                            activeStep={this.state.stepIndex}
                            linear={false}
                            orientation="vertical"
                            >
                            {this.state.questions.map((question, index) =>
                                    <Step key={index}>
                                        <StepButton onTouchTap={() => this.setState({stepIndex: index})}>
                                            <Chip className="Questions-chip">
                                                <Avatar src={question.theme.logo}/>
                                                {question.theme.name}
                                            </Chip>
                                        </StepButton>
                                    </Step>
                            )}
                        </Stepper>
                    </div>
                    <div className="Questions">
                        {this.props.children}
                    </div>
                </div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Back"
                            icon={<IconArrowBack />}
                            onTouchTap={() => this.back()}
                            />
                        <BottomNavigationItem
                            label="Questions"
                            icon={<FontIcon className="material-icons">{this.state.stepIndex} / {this.state.completed}</FontIcon>}
                            />
                        <BottomNavigationItem
                            label="Next"
                            icon={<IconArrowForward />}
                            onTouchTap={() => this.next()}
                            />
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default Questions;
