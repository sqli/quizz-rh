import React  from 'react';

import IconVeryDissatisfied from '../../node_modules/material-ui/svg-icons/social/sentiment-very-dissatisfied';
import IconDissatisfied from '../../node_modules/material-ui/svg-icons/social/sentiment-dissatisfied';
import IconNeutral from '../../node_modules/material-ui/svg-icons/social/sentiment-neutral';
import IconSatisfied from '../../node_modules/material-ui/svg-icons/social/sentiment-satisfied';
import IconVerySatisfied from '../../node_modules/material-ui/svg-icons/social/sentiment-very-satisfied';

import {Result} from '../resource/index';

import ThemesService from './ThemeService';
import LocalStorageService from './LocalStorageService';

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

    results = null;

    setResults(questions) {
        // TODO make level dynamic
        // Level
        var totalEasy = 0;
        var goodAnswerEasy = 0;
        var totalMedium = 0;
        var goodAnswerMedium = 0;
        var totalExpert = 0;
        var goodAnswerExpert = 0;
        // Total
        var totalGoodAnswer = 0;
        var selectedThemes = ThemesService.getSelectedThemes();

        // Verify that only good answers are checked.
        questions.forEach(function (question) {
            var answersAreTrue = false;
            var trueAnswerCount = 0;
            var answerCheckedCount = 0;
            var trueAnswerChecked = 0;
            var falseAnswerChecked = 0;

            question.reponses.forEach(function (answer) {
                if (answer.isTrue) {
                    trueAnswerCount++;
                }
                if (answer.checked){
                    answerCheckedCount++;
                }
                if (answer.isTrue && answer.checked) {
                    trueAnswerChecked++;
                }
                if (!answer.isTrue && answer.checked) {
                    falseAnswerChecked++
                }
                answersAreTrue = (
                    answerCheckedCount > 0
                    && trueAnswerCount === trueAnswerChecked
                    && falseAnswerChecked === 0
                );
            });

            // Count good answer
            if (answersAreTrue) totalGoodAnswer++;

            // Count good answer per level.
            switch (question.level) {
                case 'Débutant':
                    totalEasy++;
                    if (answersAreTrue) goodAnswerEasy++;
                    break;
                case 'Intermédiaire':
                    totalMedium++;
                    if (answersAreTrue) goodAnswerMedium++;
                    break;
                case 'Expert':
                    totalExpert++;
                    if (answersAreTrue) goodAnswerExpert++;
                    break;
                default:
                    console.error('Une question n\'a pas été comptabilisé dans les niveaux de difficulté');

            }

            // Count good answer per theme
            selectedThemes.forEach(function(theme){
                theme.result = theme.result || 0;
                if(question.theme.name === theme.name && answersAreTrue){
                    theme.result++;
                }
            });

        });

        // Convert good answer per level in percent
        selectedThemes.forEach(function(theme){
            theme.result = (theme.result * 100 / theme.questions.length) || 0;
        });

        // Prepare result object
        this.results = {
            totalGoodAnswer: Math.round(totalGoodAnswer * 100 / questions.length),
            theme: selectedThemes,
            level:{
                easy: Math.round(goodAnswerEasy * 100 / totalEasy),
                medium: Math.round(goodAnswerMedium * 100 /  totalMedium),
                difficult: Math.round(goodAnswerExpert * 100 / totalExpert)
            }
        };
        LocalStorageService.setItem('result', this.results);
    }

    getResults(){
        if(!this.results){
            this.results = LocalStorageService.getItem('result');
        }
        return this.results;
    }

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

    query = () => {
        return Result.query();
    }

}

let instance = new ResultService();

export default instance;
