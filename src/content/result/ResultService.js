import React  from 'react';

import IconVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import IconDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import IconNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import IconSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import IconVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';

const bounds = {
    verySatisfied: {
        legend: 'Très satisfaisant',
        maxResult : 100,
        icon : <IconVerySatisfied color="green"/>
    },
    satisfied: {
        legend: 'Satisfaisant',
        maxResult : 80,
        icon : <IconSatisfied color="lightGreen"/>
    },
    neutral: {
        legend: 'Moyen',
        maxResult : 60,
        icon : <IconNeutral color="yellow"/>
    },
    dissatisfied: {
        legend: 'Insatisfaisant',
        maxResult : 40,
        icon : <IconDissatisfied color="orange"/>
    },
    veryDissatisfied: {
        legend: 'Très insatisfaisant',
        maxResult : 20,
        icon : <IconVeryDissatisfied color="red"/>
    }

};

class ResultService {

    satisfaction(result) {

        if (result > bounds.satisfied.maxResult && result <= bounds.verySatisfied.maxResult) {
            return bounds.verySatisfied.icon;
        } else if (result > bounds.neutral.maxResult && result <= bounds.satisfied.maxResult) {
            return bounds.satisfied.icon;
        } else if (result > bounds.dissatisfied.maxResult && result <= bounds.neutral.maxResult) {
            return bounds.neutral.icon;
        } else if (result > bounds.veryDissatisfied.maxResult && result <= bounds.dissatisfied.maxResult) {
            return bounds.dissatisfied.icon;
        } else {
            return bounds.veryDissatisfied.icon;
        }
    }

    getLegends(){
        var legend = [];
        for(let i in bounds){
            if(bounds.hasOwnProperty(i)){
                let bound = bounds[i];
                legend.push(bound);
            }
        }
        return legend;
    }

}

let instance = new ResultService();

export default instance;
