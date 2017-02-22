import {Theme} from '../../resource/index';

const nbQuestionsMinToStart = 20;

class ThemeService {

    basket = [];

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
        return nbQuestionsMinToStart;
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
                        logo: theme.logo,
                        level: theme.level
                    },
                    title: question.title,
                    code: question.code,
                    responses: question.responses
                });
            });
        });
        return questions;
    }

    query = () => {
        console.log(Theme);
        return Theme.query();
    }
}

export default new ThemeService();