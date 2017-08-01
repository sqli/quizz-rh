/**
 * Created by nhingan on 12/07/2017.
 */
import React, {Component} from 'react';
import ReferentService from '../../services/ReferentService';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconDeleteForever from '../../../node_modules/material-ui/svg-icons/action/delete-forever';
import IconModeEdit from '../../../node_modules/material-ui/svg-icons/editor/mode-edit';
import './Referent.css';


class Referent extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            referent: ''
        };
    }

    componentDidMount() {
        this.setState({referent: this.props.value});
    }

    handleDelete(event) {
        ReferentService.delete(this.state.referent._links);
        this.props.handler();
    }

    handleUpdate(event) {
        ReferentService.update();
        this.props.handler();
    }


    componentWillUpdate(nextProps, nextState) {

        if (nextProps.active) {
            this.activeClass = "active";
        } else {
            this.activeClass = "";
        }
    }

    render() {
        return (
            <Card className={"Referent " + this.activeClass} onClick={this.props.onClick}>

                <CardHeader
                    title={this.state.referent.firstName + ' ' + this.state.referent.lastName}
                    titleStyle={{'lineHeight': '2.8em'}}
                    avatar={this.state.referent.avatar}
                />
                <CardActions>
                    <FlatButton
                        label="Selectionner"

                        default={true}
                        icon={<IconModeEdit />}/>

                    <FlatButton
                        label="Modifier"
                        onTouchTap={this.handleUpdate}
                        primary={true}
                        icon={<IconModeEdit />}/>
                    <FlatButton
                        label="Supprimer"
                        onClick={event => this.handleDelete(this.state.referent)}
                        secondary={true}
                        icon={<IconDeleteForever />}/>
                </CardActions>

            </Card>
        );

    }
}
export default Referent;