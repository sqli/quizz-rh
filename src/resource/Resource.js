import axios from 'axios';

import {config} from '../config.js';

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
        return data[this.idProp] ? axios.put(this.endpoint + '/' + data[this.idProp], data) : axios.post(this.endpoint, data);
    }

    //mise a jour ?????
    update(data) {
        return axios.patch(this.cleanEndpoint(data._links.self.href), data)
    }

    delete(id) {
        return axios.delete(this.endpoint + '/' + id);
    }

    get(id) {
        return axios.get(this.endpoint + '/' + id)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw(error);
            });
    };

    // création d'une méthode qui récupère l'url et qui en fonction du mode de l'appli (dévéloppement ou deployée)
    // renverra une partie de l'url ou l'url complète (localhost /8080 + localhost/3000 en mode dev ..)
    cleanEndpoint(url) {
        if (process.env.NODE_ENV === "development") {
            let endPointStart = url.search(this.endpoint);
            return url.substr(endPointStart);
        } else {
            return url
        }
    }

    cleanId(url) {
        let endPointStart = url.search(this.endpoint);
        return url.substr(endPointStart + (this.endpoint.length + 1));

    }

    /**
     * Cette méthode à pour but de récupérer le lien d'une entité associé a une autre entité
     * @param link
     * @returns {Promise.<T>|Promise<R>}
     */
    follow_link(link) {
        return axios.get(this.cleanEndpoint(link))
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
