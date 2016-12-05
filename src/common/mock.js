let mocks = [];

class Mock {

    constructor(method, url, response){
        this.method = method;
        this.url = url;
        this.response = response;
    }

    getMethod(){
        return this.method;
    }

    getUrl(){
        return this.url;
    }

    getResponse(){
        return this.response;
    }


}

Mock.push = function(mock){
    mocks.push(mock)
};

Mock.all = function(){
    return mocks;
};

Mock.getMockedResponse = function(method, url){
    for(var i in mocks){
        if(mocks[i].getMethod() === method && mocks[i].getUrl() === url){
            return mocks[i].getResponse();
        }
    }
};

export default Mock;