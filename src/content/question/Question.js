import React, { Component } from 'react';

import { browserHistory } from 'react-router';

var Highlight = require('react-highlight');
import {Card, CardText, CardMedia, CardHeader} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

import themeService from '../../resource/theme';

import '../../../node_modules/highlight.js/styles/arduino-light.css';
import './Question.css';

class Question extends Component {

    constructor(props){
        super();
        this.index = props.params.id - 1;
        this.state = {
            completed: 20,
            question: null
        };
    }

    componentWillMount(){
        const questions = themeService.getSelectedQuestions();
        if(questions.length === 0){
            browserHistory.push('/themes');
        }else{
            this.setState({
                question: questions[this.index]
            });
        }
    }

    isCorrect(){
        return true;
    }

    render() {
        return this.state.question && (
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
