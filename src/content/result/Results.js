import React, { Component } from 'react';

import Result from './Result';

import './Results.css';


class Results extends Component {

    constructor(props){
        super();
        this.state = {
            results: props.value || []
        }
    }

    render() {
        return (
            <ul>
                {
                    this.state.results.map((result, index) =>
                        <Result key={index} value={result}/>
                    )
                }
            </ul>
        );
    }
}

export default Results;
