import Resource from './Resource';

const nbQuestionsMinToStart = 20;

class Theme extends Resource {

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
                    theme: {
                        id: theme.id,
                        name: theme.name,
                        logo: theme.logo
                    },
                    title: question.title,
                    code: question.code,
                    responses: question.responses
                });
            });
        });
        return questions;
    }

}

export default new Theme('/themes');
