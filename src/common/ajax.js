import Mock from './mock';

class Ajax {

    get(url){
        var mockedResponse = Mock.getMockedResponse('GET', url);
        if(mockedResponse){
            return new Promise(resolve => {
                resolve(mockedResponse);
            });
        }
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.onreadystatechange = function (aEvt) {
                if (req.readyState === 4) {
                    if(req.status === 200){
                        try{
                            var response = req.responseText && JSON.parse(req.responseText)
                            resolve(response);
                        }
                        catch(err){
                            reject('Erreur dans le corp de la reponse pour la requete sur l\'url ' + url + '.\n' + err.toString()+'\n');
                        }
                    }
                    else{
                        reject('Erreur pendant le chargement de la page.\n');
                    }
                }
            };
            req.send(null);
        });
    }
}
export default new Ajax();