import ajax from '../common/ajax';

class Resource {

    constructor(endpoint){
        this.endpoint = endpoint;
    }

    save(){

    }

    delete(){

    }

    get(id){

    };

    query(){
        return new Promise((resolve, reject) => {
            ajax.get(this.endpoint).then(data => {
                resolve(data.map(function(item){
                    return item;
                }));
            }).catch(reject);
        });
    };


}

export default Resource;
