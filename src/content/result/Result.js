import React, { Component } from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';

import ResultService from './ResultService';

import './Result.css';

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
                    subtitle={Math.round(this.result) + '%'}
                    avatar={this.theme.logo}
                    />
                <CardText className="cardText">
                    {ResultService.satisfaction(this.result)}
                </CardText>
            </Card>
        );
    }
}

export default Result;