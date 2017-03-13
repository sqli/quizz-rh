import React, { Component } from 'react';
import { browserHistory } from 'react-router';

var Highlight = require('react-highlight');
import '../../../node_modules/react-highlight/node_modules/highlight.js/styles/atom-one-dark.css';

import {Card, CardText, CardMedia, CardHeader, CardTitle} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

import './Question.css';

class Question extends Component {

    constructor(props) {
        super(props);
        this.index = props.params.id - 1;
        this.state = {
            question: null
        };
    }

    componentDidMount() {
        const question = this.props.question;
        if (!question) {
            browserHistory.push('/themes');
        } else {
            this.setState({
                question: question
            });
        }
    }


    componentWillReceiveProps(nextProps) {
        this.index = nextProps.params.id - 1;
        const question = nextProps.question;
        this.setState({
            question: question
        });
    }


    handleCheck(index, event, checked) {
        let question = this.state.question;
        question.responses[index].checked = checked;
        this.setState({
            question: question
        });

    };

    render() {
        return this.state.question && (
                <Card style={{boxShadow: 'none'}}>
                    <CardHeader
                        title={this.state.question.theme.name}
                        subtitle={'Question '+ this.state.question.id}
                        avatar={this.state.question.theme.logo}
                    />
                    <CardTitle title={this.state.question.title + ' :'} />
                    <CardMedia>
                        <div className="question-content">
                            <div>
                            </div>
                            <div className="question-code">
                                <Highlight className={this.state.question.theme.name}>
                                    {this.state.question.code}
                                </Highlight>
                            </div>
                        </div>
                    </CardMedia>
                    <CardText>
                        {
                            this.state.question.responses.map((response, index) =>
                                <Checkbox
                                    onCheck={this.handleCheck.bind(this, index)}
                                    key={index}
                                    label={response.title}
                                    checked={response.checked || false}
                                />)
                        }
                    </CardText>
                </Card>
            );
    }
}

export default Question;
