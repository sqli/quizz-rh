import React, { Component } from 'react';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import Result from './../../components/result/Result';

import ResultService from './../../services/ResultService';

import LoginService from '../../services/LoginService';

import './Results.css';


class Results extends Component {

    constructor(props){
        super(props);
        var results = ResultService.getResults();
        this.state = {
            results: props.value || [],
            legends: ResultService.getLegends(),
            resultsTheme: results.theme,
            resultsLevel: results.level,
            login : LoginService.getLogin()
        };
        this.legends = ResultService.getLegends();
    }

    componentDidMount(){

    }

    render() {
        return (
            <div className="row">
                <div className="column">
                    <h1>{this.state.login}</h1>
                    <div className="row justifyCenter">
                        {
                            this.state.resultsTheme.map((result, index) =>
                                <Result key={index} value={result}/>
                            )
                        }
                    </div>
                    <List className="row legend">
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
            </div>
        );
    }
}

export default Results;
