
class LocalStorageService {

    setItem(key, item){
        localStorage.setItem(key, JSON.stringify(item));
    }

    getItem(key){
        return JSON.parse(localStorage.getItem(key));
    }

    clear(){
        localStorage.clear();
    }
    removeItem(key){
        localStorage.removeItem(key);
    }

}

export default new LocalStorageService();