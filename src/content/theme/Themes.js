import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconStart from 'material-ui/svg-icons/av/play-arrow';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import Theme from './../../components/theme/Theme';
import ThemeService from './ThemeService';
import QuestionService from '../question/QuestionService';
import LocalStorageService from '../../commons/LocalStorageService';

import './Themes.css';

class Themes extends Component {

    constructor(props){
        super(props);
        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.state = {
            themes: [],
            nbQuestionsIntoBasket: ThemeService.nbQuestionsIntoBasket(),
            isEnoughToStart: ThemeService.isEnoughToStart()
        };
    }

    componentDidMount(){
        ThemeService.query().then(function(themes){
            this.setState({themes: themes});
        }.bind(this));
    }

    start(){
        ThemeService.setSelectedThemes(ThemeService.getBasket());
        LocalStorageService.setItem('stepIndex', 1);
        QuestionService.addQuestion(ThemeService.getSelectedQuestions());
        browserHistory.push('/question/1');
    }

    handleThemeChange(){
        this.setState({
            nbQuestionsIntoBasket: ThemeService.nbQuestionsIntoBasket(),
            isEnoughToStart: ThemeService.isEnoughToStart()
        });
    }

    render() {
        return (
            <div>
                <div className="content-with-paper">
                    <div>
                        <Badge className="themes-badge"
                            badgeContent={this.state.nbQuestionsIntoBasket}
                            primary={this.state.isEnoughToStart}
                            secondary={!this.state.isEnoughToStart}
                            badgeStyle={{'marginTop':'1em'}}
                            >
                            <NotificationsIcon />
                        </Badge>
                        <p className="themes-paragraphe">
                            Vous devez sélectionner des thèmes de questions pour arriver à un minimum de <strong>{ThemeService.getNbQuestionsMinToStart()}</strong> questions afin de pouvoir démarrer le test.
                        </p>
                        </div>
                    <ul className="Themes">
                        {this.state.themes.map(theme =>
                                <Theme key={theme.id} value={theme} onChange={this.handleThemeChange}/>
                        )}
                    </ul>
                </div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.isEnoughToStart ? 0 : 1}>
                        <BottomNavigationItem
                            disabled={!this.state.isEnoughToStart}
                            label="Demarrer"
                            icon={<IconStart />}
                            onTouchTap={() => this.start()}
                            />
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default Themes;
