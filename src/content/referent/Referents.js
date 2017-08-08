/**
 * Created by nhingan on 12/07/2017.
 */
import React, {Component} from 'react';
import ReferentService from './../../services/ReferentService';
import Referent from './../../components/referent/Referent';

class Referents extends Component {

    constructor(props){
        super(props);
        this.state = {
            referents: []
        };
    }
    componentDidMount() {
        ReferentService.query().then(function (referents) {
            this.setState({referents: referents._embedded.referent});// Chargement des referents à partir du service REST
        }.bind(this));
    }

    render(){
        return(
            <ul className="Referents">

                {this.state.referents.map( (referent, count) =>
                   <Referent key={count} value={referent}/>
                )}

            </ul>


        )
    }
}

export default Referents;