/**
 * Created by nhingan on 11/07/2017.
 */
import React, {Component} from "react";
import Theme from './../../../components/theme/Theme';
import {Link} from 'react-router';
import ThemeService from '../../../services/ThemeService';
import {Card, CardHeader}from "material-ui/Card";
import "./AdminListThemes.css"


class AdminListThemes extends Component {

    constructor(props) {
        super(props);
        this.handleThemeClick = this.handleThemeClick.bind(this);
        this.state = {}
    }

    componentDidMount() {
    }

    handleThemeClick(theme) {
        this.setState({selectedTheme: theme._links.self.href});
    }

    getId(theme) {
        return ThemeService.getId(theme)
    }

    render() {
        return (
            <div className="formCardQuestionChoixTheme">

                <Card>
                    <CardHeader className="cardHeaderQuestionChoixTheme">Listes des thèmes existants :</CardHeader>
                    <span className="infoComplémentaire"><p> Clique sur un thème pour le modifier ou le compléter</p></span>
                    {this.props.themes.map((theme, count) =>
                        <Link to={'adminModifTheme/' + this.getId(theme)}>
                            <Theme handler={this.handleRefresh} key={count} value={theme}
                            />
                        </Link>
                    )}
                </Card>
            </div>
        );
    }
}
export default AdminListThemes;