

class QuestionService {
    questions = [];

    addQuestion = (questions) => {
        this.questions = questions;
    };

    findQuestionByIndex = (index) => {
        return this.questions[index];
    };

    getQuestions() {
        return this.questions;
    }
}

export default new QuestionService();