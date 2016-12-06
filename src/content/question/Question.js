import React, { Component } from 'react';

var Highlight = require('react-highlight');
import {Card, CardText, CardMedia, CardHeader} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

import './Question.css';
import '../../../node_modules/highlight.js/styles/arduino-light.css';

class Question extends Component {

    constructor(props){
        super();
        this.state = {
            completed: 20,
            question: props.value
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
