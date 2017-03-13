import React, { Component } from 'react';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import QuestionService from '../../services/QuestionService';

import './questionNavigation.css'

var classNames = require('classnames');

class QuestionNavigation extends Component {
    constructor(props) {
        super(props);
        this.questions = props.questions;
        this.state = {
            stepIndex: props.stepIndex,
            questions: props.questions,
            themes: props.themes
        };
        this.styles = {
            block: {
                maxWidth: 550
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stepIndex: nextProps.stepIndex
        });
    }

    go = (stepIndex) => {
        this.props.handleGo(stepIndex);
    };

    onChangeHandler = (event, value) => {
        this.setState({
            questionNotAnswered: value === 'NOT_ANSWERED'
        });
    };

    render() {
        var getBtnClass = (question, index) => {
            let isAnswered = QuestionService.isAnswered(question);
            return classNames({
                'question-button': true,
                'active': this.state.stepIndex === index+1,
                'answered': isAnswered
            });
        };
        return (
            <div className="quizz-navigation-container">
                <div className="questions-navigation">
                    {
                        this.state.themes.map((theme, tIndex) =>
                            <div key={tIndex} className="question-themes">
                                <Chip className="theme-chip" key={tIndex} >
                                    <Avatar src={theme.logo}/>{theme.name}
                                </Chip>
                                <div>
                                    {
                                        this.state.questions.map((question, qIndex) =>
                                            (question.theme.id === theme.id && (!this.state.questionNotAnswered || !QuestionService.isAnswered(question))
                                                    ?
                                                        <button className={getBtnClass(question, qIndex)} key={tIndex + '_' + qIndex} onTouchTap={() => this.go(qIndex+1)}>{qIndex +1}</button>
                                                    :
                                                        null
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="radio-button-container">
                    <RadioButtonGroup name="shipSpeed" defaultSelected="ALL" onChange={this.onChangeHandler.bind(this)}>
                        <RadioButton
                            value="ALL"
                            label="All"
                            className="radio-button"
                        />
                        <RadioButton
                            value="NOT_ANSWERED"
                            label="Not answered"
                            className="radio-button"
                        />
                    </RadioButtonGroup>
                </div>
            </div>
        );
    }

}
export default QuestionNavigation;