var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
//var themes = require("../../stub/themes.json");

let mocklist;
class MockAxios {


    addMocks(mocks) {
        mocklist = mocks;
        var mock = new MockAdapter(axios);
        // Match ALL requests
        mock.onAny().reply(config => {
            const [method, url, ...response] = mocklist.shift();
            if (config.url === url && config.method.toUpperCase() === method) return response;
            // Unexpected request, error out
            return [500, {}];
        });
    }
}

export default new MockAxios();
