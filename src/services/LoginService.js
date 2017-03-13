import localStorageService from 'LocalStorageService';

class LoginService {

    login = null;

    setLogin(login){
        localStorageService.setItem('login', login);
        this.login = login;
    }
    getLogin(){
        if(!this.login){
            this.login = localStorageService.getItem('login');
        }
        return this.login;
    }

}

export default new LoginService();