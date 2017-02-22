import React, { Component } from 'react';

import { browserHistory } from 'react-router';

var Highlight = require('react-highlight');
import {Card, CardText, CardMedia, CardHeader} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

import ThemeService from '../theme/ThemeService';

import '../../../node_modules/react-highlight/node_modules/highlight.js/styles/arduino-light.css';
import './Question.css';

class Question extends Component {

    constructor(props){
        super(props);
        this.index = props.params.id - 1;
        this.state = {
            question: null
        };
    }

    componentDidMount(){
        const questions = ThemeService.getSelectedQuestions();
        if(questions.length === 0){
            browserHistory.push('/themes');
        }else{
            this.setState({
                question: questions[this.props.params.id - 1]
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const questions = ThemeService.getSelectedQuestions();
        this.setState({
            question: questions[nextProps.params.id - 1]
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }


    handleCheck(index, event, checked) {
        let question  = this.state.question;
        question.responses[index].checked = checked;
        this.setState({
            question: question
        });
    };

    render() {
        return this.state.question && (
                <Card className="Question">
                    <CardHeader
                        title={this.state.question.theme.name + ' - Niveau: ' + this.state.question.theme.level}
                        subtitle={'Question '+ this.state.question.id + ' - ' + this.state.question.title + ' :'}
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
                                    onCheck={this.handleCheck.bind(this, index)}
                                    key={index}
                                    label={response.title}
                                    defaultChecked={response.checked}
                                />)
                        }
                    </CardText>
                </Card>

            );
    }
}

export default Question;
