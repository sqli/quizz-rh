import React, { Component } from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import IconMood from 'material-ui/svg-icons/social/mood';
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad';

import './Result.css';

const moodMinimum = 80;

const iconMoodStyle = {
    height: '150px',
    width: '150px'
};

class Result extends Component {

    constructor(props){
        super();
        this.result = props.value.result;
        this.theme = props.value.theme;
    }

    render() {
        return (
            <Card className="Result">
                <CardHeader
                    title={this.theme.name}
                    subtitle={this.result + '%'}
                    avatar={this.theme.logo}
                    />
                <CardText className="cardText">
                    {this.result > moodMinimum && <IconMood color="green" style={iconMoodStyle}/>}
                    {this.result <= moodMinimum && <IconMoodBad color="red" style={iconMoodStyle}/>}
                </CardText>
            </Card>
        );
    }
}

export default Result;