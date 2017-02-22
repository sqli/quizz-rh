import React, { Component } from 'react';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import Result from './../../components/result/Result';
import ResultService from './ResultService';

import './Results.css';


class Results extends Component {

    constructor(props){
        super(props);
        this.state = {
            results: props.value || [],
            legends: ResultService.getLegends()
        };
        this.legends = ResultService.getLegends();
    }

    componentDidMount(){
        console.log('componentDidMount');
        ResultService.query().then(function(results){
            console.log('componentDidMount', 'resolve');
            this.setState({results: results});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.results.map((result, index) =>
                                <Result key={index} value={result}/>
                        )
                    }
                </ul>
                <List>
                    {
                        this.legends.map((item, index) =>
                                <ListItem
                                    key={index}
                                    disabled={true}
                                    leftAvatar={item.icon}
                                    >
                                    {item.legend} {'<= ' + item.maxResult}
                                </ListItem>
                        )}
                </List>
            </div>
        );
    }
}

export default Results;
