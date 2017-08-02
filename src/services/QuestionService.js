import localStorageService from './LocalStorageService';
import {Question} from '../resource/index';

import {config} from '../config.js';
//import {Theme} from '../resource/index';

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
        if (this.questions.length === 0) {
            this.questions = localStorageService.getItem('questions');
        }
        return this.questions;
    }


    isAnswered(question) {
        for (var response of question.reponses) {
            if (response.checked) {
                return true;
            }
        }
        return false;
    }

    getId(question) {
        return Question.cleanId(question);
    }

    getTotalTime(questionsLength) {
        return questionsLength * timePerQuestion;
    }


    save(question) {
        return Question.save({
            questionNumber: question.questionNumber,
            level: question.level,
            title: question.title,
            code: question.code,
            reponses: question.reponses
        })
        //reponses:[{text:reponses.text, code:reponses.code, isTrue:reponses.isTrue }]
    }



}

export default new QuestionService();