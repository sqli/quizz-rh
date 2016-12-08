import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconStart from 'material-ui/svg-icons/av/play-arrow';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

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

    start(){
        browserHistory.push('/question/1');
    }

    render() {
        return (
            <div>
                <div className="content-with-paper">
                    <div>
                        <Badge className="themes-badge"
                            badgeContent={themeService.nbQuestionsIntoBasket()}
                            primary={themeService.isEnoughToStart()}
                            secondary={!themeService.isEnoughToStart()}
                            >
                            <NotificationsIcon />
                        </Badge>
                        <p className="themes-paragraphe">
                            Vous devez sélectionner des thèmes de questions pour arriver à un minimum de <strong>{themeService.getNbQuestionsMinToStart()}</strong> questions afin de pouvoir démarrer le test.
                        </p>
                        </div>
                    <ul className="Themes">
                        {this.state.themes.map(theme =>
                                <Theme key={theme.id} value={theme}/>
                        )}
                    </ul>
                </div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={themeService.isEnoughToStart() ? 0 : 1}>
                        <BottomNavigationItem
                            disabled={!themeService.isEnoughToStart()}
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
