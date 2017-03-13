import {Theme} from '../resource/index';
import LocalStorageService from '../commons/LocalStorageService';

import {config} from '../config.js';

class ThemeService {

    basket = [];
    selectedThemes = [];

    addThemeIntoBasket(theme){
        this.basket.push(theme);
    }

    removeThemeFromBasket(theme){
        if(this.themeIsIntoBasket(theme)){
            let index = this.basket.indexOf(theme);
            this.basket.splice(index, 1);
        }
    }

    themeIsIntoBasket(theme){
        return this.basket.indexOf(theme) !== -1;
    }

    nbQuestionsIntoBasket(){
        return this.basket.reduce(function(previous, item){
            return previous + item.questions.length;
        }, 0);
    }

    isEnoughToStart(){
        return this.nbQuestionsIntoBasket() >= this.getNbQuestionsMinToStart();
    }

    getNbQuestionsMinToStart(){
        return config.nbQuestionsMinToStart;
    }

    getBasket(){
        return this.basket;
    }

    setSelectedThemes(themes){
        LocalStorageService.setItem('selectedThemes', themes);
        this.selectedThemes = themes;
    }

    getSelectedThemes(){
        if(this.selectedThemes.length === 0){
            this.selectedThemes = LocalStorageService.getItem('selectedThemes')
        }
        return this.selectedThemes;
    }

    getSelectedQuestions(){
        var questions = [];
        this.basket.forEach(function(theme){
            theme.questions.forEach(function(question){
                questions.push({
                    id: question.id,
                    theme: {
                        id: theme.id,
                        name: theme.name,
                        logo: theme.logo

                    },
                    level: question.level,
                    title: question.title,
                    code: question.code,
                    responses: question.responses
                });
            });
        });
        this.basket = [];
        return questions;
    }

    query = () => {
        return Theme.query();
    }
}

export default new ThemeService();