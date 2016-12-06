import React, { Component } from 'react';

import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import Question from './Question';

import './Questions.css';

const stepperStyle = {
    width: '200px',
    display: 'inline-block'
};

class Questions extends Component {

    constructor(props){
        super();
        this.state = {
            stepIndex: 0,
            completed: 20,
            questions: props.value || []
        };
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex < this.state.questions.length) {
            this.setState({stepIndex: stepIndex + 1});
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    render() {
        return (
            <div>
                <Stepper
                    style={stepperStyle}
                    activeStep={this.state.stepIndex}
                    linear={false}
                    orientation="vertical"
                    >
                    {this.state.questions.map((question, index) =>
                        <Step key={index}>
                            <StepButton onTouchTap={() => this.setState({stepIndex: index})}>
                                <Chip>
                                    <Avatar src={question.theme.logo}/>
                                    {question.theme.name}
                                </Chip>
                            </StepButton>
                        </Step>
                    )}
                </Stepper>
                <ul className="Questions">
                    {this.state.questions.map((question, index) =>
                            <Question key={index} value={question}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default Questions;
