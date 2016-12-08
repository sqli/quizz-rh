import React, { Component } from 'react';

var Highlight = require('react-highlight');
import {Card, CardText, CardMedia, CardHeader} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

import './Question.css';
import '../../../node_modules/highlight.js/styles/arduino-light.css';

class Question extends Component {

    constructor(props){
        super();
        console.log(props.params.id);
        this.state = {
            completed: 20,
            question:{
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
                    "title": "il n'y a pas d'erreur"
                },{
                    "title": "la balise <ul> n'a pas besoin d'être fermée"
                },{
                    "title": "la balise <il> n'existe pas",
                    "isTrue": true
                }]
            }
        };
    }

    isCorrect(){
        return true;
    }

    render() {
        return (
            <Card className="Question">
                <CardHeader
                    title={this.state.question.theme.name}
                    subtitle={this.state.question.title + ' :'}
                    avatar={this.state.question.theme.logo}
                    />
                <CardMedia>
                    <Highlight className={this.state.question.theme.name}>
                        {this.state.question.code}
                    </Highlight>
                </CardMedia>
                <CardText>
                    {
                        this.state.question.responses.map((response, index) =>
                            <Checkbox
                                key={index}
                                label={response.title}
                                />
                    )}
                </CardText>
            </Card>
        );
    }
}

export default Question;
