import App from './App';
import MockAxios from './resource/mockAxios';

var themes = require("../stub/themes.json");
var results = require("../stub/results.json");

class AppStub extends App {

    constructor(props) {
        super(props);
        MockAxios.addMocks([
            ['GET', '/themes', 200, themes,],
            ['GET', '/results', 200, results]
        ]);
    }

}

export default AppStub;