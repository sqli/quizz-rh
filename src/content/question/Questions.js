import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconArrowBack from '../../../node_modules/material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from '../../../app/node_modules/material-ui/svg-icons/navigation/arrow-forward';
import IconCheck from '../../../node_modules/material-ui/svg-icons/navigation/check';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import ThemeService from '../theme/ThemeService';

import './Questions.css';

class Questions extends Component {

    constructor(props) {
        super(props);
        const questions = ThemeService.getSelectedQuestions();
        console.log(questions[Math.floor(Math.random()*questions.length)]);
        this.state = {
            stepIndex: parseInt(props.params.id, 0),
            completed: questions.length,
            questions: questions
        };
    }

    finish = () => {
        browserHistory.push('/result');
    };

    next = () => {
        const stepIndex = this.state.stepIndex + 1;
        if (stepIndex <= this.state.questions.length) {
            this.setState({stepIndex: stepIndex});
            this.props.router.push('/question/' + stepIndex);
        }
    };

    back = () => {
        const stepIndex = this.state.stepIndex - 1;
        if (stepIndex >= 1) {
            this.setState({stepIndex: stepIndex});
            browserHistory.push('/question/' + stepIndex);
        }
    };

    render() {
        const isFirstStep = this.state.stepIndex === 1;
        const isLastStep = this.state.stepIndex === this.state.questions.length;
        return (
            <div>
                <div className="content-with-paper">
                    <div className="Questions-stepper">
                        <Paper zDepth={1}>
                            <Stepper
                                activeStep={this.state.stepIndex - 1}
                                linear={false}
                                orientation="vertical"
                            >
                                {this.state.questions.map((question, index) =>
                                    <Step key={index}>
                                        <StepButton onTouchTap={() => browserHistory.push('/question/' + (index + 1))}>
                                            <Chip className="Questions-chip">
                                                <Avatar src={question.theme.logo}/>
                                                {question.theme.name}
                                            </Chip>
                                        </StepButton>
                                    </Step>
                                )}
                            </Stepper>
                        </Paper>
                    </div>
                    <div className="Questions">
                        {this.props.children}
                    </div>
                </div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            disabled={isFirstStep}
                            label="Back"
                            icon={<IconArrowBack />}
                            onTouchTap={() => this.back()}
                        />
                        <BottomNavigationItem
                            label="Questions"
                            icon={<FontIcon className="material-icons">{this.state.stepIndex} / {this.state.completed}</FontIcon>}
                        />
                        {isLastStep ? (
                            <BottomNavigationItem
                                label="Validate"
                                icon={<IconCheck />}
                                onTouchTap={() => this.finish()}
                            />
                        ) : (
                            <BottomNavigationItem
                                label="Next"
                                icon={<IconArrowForward />}
                                onTouchTap={() => this.next()}
                            />
                        )}
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
//{this.props.children && React.cloneElement(this.props.children, {
//    setQuestionResponses: this.setQuestionResponses
//})}
}

export default Questions;
