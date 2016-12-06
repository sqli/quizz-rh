import React, { Component } from 'react';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconStart from 'material-ui/svg-icons/av/play-arrow';

import './Footer.css';

class Footer extends Component {

    state = {
        selectedIndex: 0,
        questionIndex: 0,
        nbQuestions: 0
    };

    select = (index) => this.setState({selectedIndex: index});

    render() {
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Questions"
                        icon={<FontIcon className="material-icons">{this.state.nbQuestions}</FontIcon>}
                        onTouchTap={() => this.select(0)}
                        />
                    <BottomNavigationItem
                        label="Demarrer"
                        icon={<IconStart />}
                        onTouchTap={() => this.select(1)}
                        />
                    <BottomNavigationItem
                        label="Back"
                        icon={<IconArrowBack />}
                        onTouchTap={() => this.select(2)}
                        />
                    <BottomNavigationItem
                        label="Questions"
                        icon={<FontIcon className="material-icons">{this.state.questionIndex} / {this.state.nbQuestions}</FontIcon>}
                        onTouchTap={() => this.select(3)}
                        />
                    <BottomNavigationItem
                        label="Next"
                        icon={<IconArrowForward />}
                        onTouchTap={() => this.select(4)}
                        />
                </BottomNavigation>
            </Paper>
        );
    }
}

export default Footer;
