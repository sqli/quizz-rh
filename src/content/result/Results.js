import React, { Component } from 'react';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import Result from './Result';
import ResultService from './ResultService';

import './Results.css';


class Results extends Component {

    constructor(props){
        super(props);
        this.state = {
            results: props.value || [],
            legends: ResultService.getLegends()
        };
        //this.state = {
        //    results: props.value || [{
        //        theme: {
        //            "id": 1,
        //            "name": "HTML",
        //            "logo": "http://blog.netapsys.fr/wp-content/uploads/2011/05/HTML5_Logo_2562.png"
        //        },
        //        result: 6/7*100
        //    },{
        //        theme: {
        //            "id": 2,
        //            "name": "JavaScript",
        //            "logo": "http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/082014/js1_0.png?itok=BqOjTfHU",
        //        },
        //        result: 41/100*100
        //    },{
        //        theme: {
        //            "id": 3,
        //            "name": "AngularJS",
        //            "logo": "http://blog.netapsys.fr/wp-content/uploads/2015/01/angularjs-logo.png.pagespeed.ce_.2SfPGmgT_b1.png",
        //        },
        //        result: 10/15*100
        //    }]
        //};
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
