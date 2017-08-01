/**
 * Created by nhingan on 10/07/2017.
 */
import {browserHistory} from 'react-router';
import React, {Component} from "react";
import RaisedButton from "material-ui/RaisedButton";
import './OptionAdmin.css'


//class for all the admin Option choice
class OptionAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    //this fonction for call  admin Theme page
    adminTheme = () => {
        browserHistory.push('/adminTheme');
    }
    //this fonction for call admin Question page
    adminQuestion = () => {
        browserHistory.push('/adminQuestion');
    }

    render() {
        return (
            <div className="OptionCard">

                <h3> Bienvenue dans la partie administration du site : </h3>
                <div className="OptionContent">
                    <ul className="Option-Button">
                        <div>
                            <RaisedButton
                                label="Clique ici pour commencer"
                                onTouchTap={this.adminTheme}
                            />
                        </div>

                    </ul>
                </div>

            </div>

        );

    }
}
export default OptionAdmin;