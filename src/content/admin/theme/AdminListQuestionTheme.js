/**
 * Created by nhingan on 26/07/2017.
 */
import React, {Component} from "react";
import {Card, CardTitle, CardHeader}from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import DeleteForever from 'material-ui/svg-icons/action/delete';
import IconModeEdit from 'material-ui/svg-icons//editor/mode-edit'
import "./AdminListQuestionTheme.css";


class AdminListQuestionTheme extends Component {

    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
        this.state = {}
    }

    componentDidMount() {

    }



    onClickButton() {
        this.props.onQuestionModified("Nellie")
    }

    render() {
        return (
            <div className="formCardQuestionChoixTheme">
               {this.props.questions && this.props.questions.map((question, count) =>
                    <div className="cardQuestionTheme" key={count} value={question}>
                        <Card >
                            <CardTitle title={"Question n°" + question.questionNumber}/>
                            <CardHeader title={question.title}/>
                            <CardHeader title={question.code}/>
                            <FlatButton
                                label="Modifier"
                                primary={true}
                                onClick={() => { this.props.onQuestionModified(question)}}
                                icon={<IconModeEdit />}
                            />
                            <FlatButton
                                label="Supprimer"
                                secondary={true}
                                icon={<DeleteForever />}
                                onClick={() => { this.props.onDeletedQuestion(question)}}
                            />

                        </Card>
                    </div>
                )}
            </div>
        );
    }
}
export default AdminListQuestionTheme;
