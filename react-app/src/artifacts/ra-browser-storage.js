export default class RaBrowserStorage {


    static add(key, value) {
        return localStorage.setItem(key, value);
    }

    static addAsJSONString(key, value) {
        return this.add(key, JSON.stringify(value));
    }

    static addAsBase64(key, value) {
        return this.add(key, window.btoa(value));
    }


    static remove(key) {
        return localStorage.removeItem(key);
    }


    static getByKey(key) {
        return localStorage.getItem(key);
    }

    static getAsJSON(key) {
        return JSON.parse(this.getByKey(key));
    }

    static getFromBase64(key) {
        return JSON.parse(window.atob(this.getByKey(key)));
    }





    static addAsSession(key, value) {
        return sessionStorage.setItem(key, value);
    }

    static getByKeyFromSession(key) {
        return sessionStorage.getItem(key);
    }

    static removeFromSession(key) {
        return sessionStorage.removeItem(key);
    }

    static clearSession() {
        return sessionStorage.clear();
    }

    static addAsJSONStringInSession(key, value) {
        return this.addAsSession(key, JSON.stringify(value));
    }

    static getAsJSONFromSession(key) {
        return JSON.parse(this.getByKeyFromSession(key));
    }

}