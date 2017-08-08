import Resource from './Resource';

const Candidate = new Resource('/candidates');
const Theme = new Resource('/themes');
const Question = new Resource('/questions')
const Result = new Resource('/results');
const Referent = new Resource('/referents');
export {
    Candidate ,
    Theme,
    Result,
    Referent,
    Question,
}