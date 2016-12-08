import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import themeService from '../../resource/theme';

import './Questions.css';

class Questions extends Component {

    constructor(props){
        super();
        const questions = themeService.getSelectedQuestions();
        this.state = {
            stepIndex: parseInt(props.params.id, 0),
            completed: questions.length,
            questions: questions
        };
    }

    next = () => {
        const stepIndex = this.state.stepIndex + 1;
        if (stepIndex <= this.state.questions.length) {
            browserHistory.push('/question/' + stepIndex);
        }
    };

    back = () => {
        const stepIndex = this.state.stepIndex - 1;
        if (stepIndex > 1) {
            browserHistory.push('/question/' + stepIndex);
        }
    };

    render() {
        return (
            <div>
                <div className="content-with-paper">
                    <div className="Questions-stepper">
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
