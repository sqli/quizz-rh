import React, { Component } from 'react';

import Theme from './Theme';
import themeService from '../../resource/theme';

import './Themes.css';

class Themes extends Component {

    constructor(){
        super();
        this.state = {
            themes: []
        };
    }

    componentDidMount(){
        themeService.query().then(function(themes){
            this.setState({themes: themes});
        }.bind(this));
    }

    render() {
        return (
            <ul>
                {this.state.themes.map(theme =>
                    <Theme key={theme.id} value={theme}/>
                )}
            </ul>
        );
    }
}

export default Themes;
