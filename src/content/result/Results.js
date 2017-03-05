import React, { Component } from 'react';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import Result from './../../components/result/Result';

import ResultService from './ResultService';

import './Results.css';


class Results extends Component {

    constructor(props){
        super(props);
        var results = ResultService.getResults();
        this.state = {
            results: props.value || [],
            legends: ResultService.getLegends(),
            resultsTheme: results.theme,
            resultsLevel: results.level
        };
        this.legends = ResultService.getLegends();
    }

    componentDidMount(){
        //ResultService.query().then(function(results){
        //    this.setState({results: results});
        //}.bind(this));
    }

    render() {
        return (
            <div className="row ">
                <div className="flex"></div>
                <div className="column">
                    <div className="row justifyCenter">
                        {
                            this.state.resultsTheme.map((result, index) =>
                                <Result key={index} value={result}/>
                            )
                        }
                    </div>
                    <List className="row">
                        {
                            this.legends.map((item, index) =>
                                <ListItem
                                    key={index}
                                    disabled={true}
                                    leftAvatar={item.icon}
                                    primaryText={item.legend + '<= ' + item.maxResult}
                                >
                                </ListItem>
                            )}
                    </List>
                </div>
                <div className="flex"></div>
            </div>
        );
    }
}

export default Results;
