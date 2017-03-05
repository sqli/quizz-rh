import localStorageService from '../../commons/LocalStorageService';

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
}

export default new QuestionService();