import {Theme, Referent} from '../resource/index';
import LocalStorageService from './LocalStorageService';

import {config} from '../config.js';

class ThemeService {

    basket = [];
    selectedThemes = [];


    addThemeIntoBasket(theme) {
        this.basket.push(theme);
    }

    removeThemeFromBasket(theme) {
        if (this.themeIsIntoBasket(theme)) {
            let index = this.basket.indexOf(theme);
            this.basket.splice(index, 1);
        }
    }

    themeIsIntoBasket(theme) {
        return this.basket.indexOf(theme) !== -1;
    }

    nbQuestionsIntoBasket() {
        return this.basket.reduce(function (previous, item) {
            return previous + item.questions.length;
        }, 0);
    }

    isEnoughToStart() {
        return this.nbQuestionsIntoBasket() >= this.getNbQuestionsMinToStart();
    }

    getNbQuestionsMinToStart() {
        return config.nbQuestionsMinToStart;
    }

    getBasket() {
        return this.basket;
    }

    setSelectedThemes(themes) {
        LocalStorageService.setItem('selectedThemes', themes);
        this.selectedThemes = themes;
    }

    getSelectedThemes() {
        if (this.selectedThemes.length === 0) {
            this.selectedThemes = LocalStorageService.getItem('selectedThemes')
        }
        return this.selectedThemes;
    }

    getSelectedQuestions() {
        var questions = [];
        this.basket.forEach(function (theme) {
            theme.questions.forEach(function (question) {
                questions.push({
                    id: question.id,
                    theme: {
                        id: theme.id,
                        name: theme.name,
                        logo: theme.logo

                    },
                    questionNumber: question.questionNumber,
                    level: question.level,
                    title: question.title,
                    code: question.code,
                    reponses: question.reponses
                });
            });
        });
        this.basket = [];
        return questions;
    }

    // creation d 'un fonction pour récupérer  le lien correspondant au référent du thème
    getReferent(theme) {
        return Theme.follow_link(theme._links.referent.href);
    }

    // création d 'une fonction qui permet de récupérer le lien correspondant aux questions du thème
    getQuestions(theme) {
        return Theme.follow_link(theme._links.questions.href);
    }

    //fonction for create a new theme with an associating Referent in MongoDB
    save(theme) {
        Theme.save({...theme, referent: Referent.cleanEndpoint(theme.selectedReferent)});
    }

    //fonction for create a new theme
    create(theme) {
        Theme.save({name: theme.name, logo: theme.logo, questions:[]});
    }

    getId(theme) {
        return Theme.cleanId(theme._links.self.href);
    }

    get(id) {
        let theme = Theme.get(id);
        theme.id = id;
        return theme;
    }

    /*  delete(question){
        console.log("je suis détruite")
        return Theme.delete({
            ici je vais créer dans ressource une méthode delete qui ne supprime pas l'id mais une data dans un id puis appeler cette methode pour ma question cliqué voir avec matthieu ...

        })
    }*/

    update(theme) {
        if (theme.selectedReferent) {
            Theme.update({...theme, referent: Referent.cleanEndpoint(theme.selectedReferent)})
        } else {
            Theme.update(theme)
        }
    }

    query = () => {
        return Theme.query();
    }
}

export default new ThemeService();