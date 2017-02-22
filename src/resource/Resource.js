import axios from 'axios';
import urlJoin from 'url-join';
import config from '../config';

export default class Resource {

    constructor(endpoint, idProp) {
        if (!config.apiPrefix) {
            throw new Error('[apiPrefix] required');
        }
        this.endpoint = endpoint;
        axios.defaults.baseURL = config.apiPrefix;

        this.idProp = idProp || 'id';
    }

    save(data) {
        return data[this.idProp] ? axios.put(this.endpoint + '/' +data[this.idProp], data) : axios.post(this.endpoint, data);
    }

    delete(id) {
        return axios.delete(this.endpoint + '/' +id);
    }

    get(id) {
        return axios.get(this.endpoint + '/' +id)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw(error);
            });
    };

    query(params) {
        return axios.get(this.endpoint, params)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw(error);
            });
    };


}
