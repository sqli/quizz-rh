import Mock from './common/mock';
import App from './App';

var themes = require("./stub/themes.json");

class AppStub extends App {

    constructor(props) {
        super(props);
        Mock.push(new Mock('GET', '/themes', themes));
    }

}

export default AppStub;