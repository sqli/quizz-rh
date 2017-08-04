import {Referent} from '../resource/index';
import LocalStorageService from './LocalStorageService';



class ReferentService {

    referents = [];


    //function for get all the MongoDb's creating referent
    getReferents() {
        if (this.referents.length === 0) {
            this.referents = LocalStorageService.getItem('referents');
        }
        return this.referents;
    }

    //fonction for create a new  Referent in MongoDB
    save(referent) {
        Referent.save({firstName: referent.firstName, lastName: referent.lastName, avatar: referent.avatar});
    }

    //function for delete a referent in MongoDB
    delete(referent){
        let url = referent.referent.href;
        let id = url.substring(url.lastIndexOf("/"));
        Referent.delete(id);
    }

    //function for Update an existing référent in MongoDB
    update(referent){
        Referent.update(referent)
    }


    query = () => {
        return Referent.query();
    }
}
export default new ReferentService();