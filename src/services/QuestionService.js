import localStorageService from '../commons/LocalStorageService';

import {config} from '../config.js';

const timePerQuestion = config.timePerQuestion;
class QuestionService {
    questions = [];

    addQuestion = (questions) => {
        localStorageService.setItem('questions', questions);
        this.questions = questions;
    };

    findQuestionByIndex = (index) => {
        return this.questions[index];
    };

    getQuestions() {
        if(this.questions.length === 0){
            this.questions = localStorageService.getItem('questions');
        }
        return this.questions;
    }

    isAnswered (question) {
        for(var response of question.responses) {
            if(response.checked) {
                return true;
            }
        }
        return false;
    }

    getTotalTime (questionsLength) {
        return questionsLength * timePerQuestion;
    }
}

export default new QuestionService();