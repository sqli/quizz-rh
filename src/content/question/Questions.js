import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import {fullWhite} from 'material-ui/styles/colors';

//import FontIcon from 'material-ui/FontIcon';
import IconArrowBack from '../../../node_modules/material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from '../../../node_modules/material-ui/svg-icons/navigation/arrow-forward';
import IconCheck from '../../../node_modules/material-ui/svg-icons/navigation/check';

import CountDownTimer from '../../components/countDownTimer/CountDownTimer';
import QuestionNavigation from '../../components/questionNavigation/QuestionNavigation';

import ThemeService from '../../services/ThemeService';
import QuestionService from './../../services/QuestionService';
import ResultService from '../../services/ResultService';
import LocalStorageService from '../../services/LocalStorageService';


import './Questions.css';

class Questions extends Component {

    constructor(props) {
        super(props);
        const questions = QuestionService.getQuestions();
        this.themes = ThemeService.getSelectedThemes();
        this.state = {
            stepIndex: parseInt(props.params.id, 0) || LocalStorageService.getItem('stepIndex'),
            completed: questions.length,
            questions: questions,
            progress: 0
        };

    }

    componentDidMount() {
        if (this.state.completed > 0) {
            browserHistory.push('/question/' + this.state.stepIndex);
        }
    }

    finish = () => {
        ResultService.setResults(this.state.questions);
        LocalStorageService.removeItem('stepIndex');
        browserHistory.push('/result');
    };

    go = (stepIndex) => {
        this.setState({stepIndex: stepIndex});
        browserHistory.push('/question/' + stepIndex);
    };

    next = () => {
        const stepIndex = this.state.stepIndex + 1;
        if (stepIndex <= this.state.questions.length) {
            this.setState({stepIndex: stepIndex});
            this.setState({
                progress: stepIndex * 100 / this.state.completed
            });
            this.props.router.push('/question/' + stepIndex);
        }
        LocalStorageService.setItem('questions', this.state.questions);
        LocalStorageService.setItem('stepIndex', stepIndex);
    };

    back = () => {
        const stepIndex = this.state.stepIndex - 1;
        if (stepIndex >= 1) {
            this.setState({stepIndex: stepIndex});
            browserHistory.push('/question/' + stepIndex);
        }
        LocalStorageService.setItem('questions', this.state.questions);
        LocalStorageService.setItem('stepIndex', stepIndex);
    };


    render() {
        return (
            <div className="quizz-page">
                <div className="content-with-paper">
                    <div className="Questions">
                        <Paper className="Question-paper">
                            <div>
                                {this.props.children && React.cloneElement(this.props.children, {
                                    question: QuestionService.findQuestionByIndex(this.props.children.props.params.id - 1)
                                })}
                            </div>
                            <div className="question-navigation">
                                <div className="raisedButton">
                                    <RaisedButton
                                        label='Back'
                                        primary={true}
                                        icon={<IconArrowBack />}
                                        disabled={this.state.stepIndex === 1}
                                        onTouchTap={this.back}
                                    />
                                </div>
                                <div className="question-navigation-step">
                                    <span>{this.state.stepIndex } / {this.state.completed}</span>
                                </div>
                                <div className="raisedButton">
                                    <RaisedButton
                                        label={this.state.stepIndex === this.state.completed ? 'Validate' : 'Next'}
                                        primary={this.state.stepIndex !== this.state.completed}
                                        backgroundColor="#a4c639"
                                        labelColor="white"
                                        icon={this.state.stepIndex === this.state.completed ? <IconCheck color={fullWhite}/> : <IconArrowForward />}
                                        onTouchTap={this.state.stepIndex === this.state.completed ? this.finish : this.next}
                                    />
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <div className="Questions-nav">
                        <Paper zDepth={1} className="Questions-nav-paper">
                            <div className="time-section">
                                <span className="section-header">Time</span>
                                <CountDownTimer initialTimeRemaining={QuestionService.getTotalTime(this.state.completed)} onComplete={this.finish.bind(this)}/>
                            </div>
                            <div className="progress-section">
                                <span  className="section-header">Progress</span>
                                <LinearProgress mode="determinate" value={this.state.progress}/>
                            </div>
                            <div className="stepper-section">
                                <span  className="section-header">Questions</span>
                                <QuestionNavigation themes={this.themes} questions={this.state.questions} stepIndex={this.state.stepIndex} handleGo={this.go.bind(this)}/>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

export default Questions;
