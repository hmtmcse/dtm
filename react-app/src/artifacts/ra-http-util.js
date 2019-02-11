import axios from "axios";


export default class RaHttpUtil {

    static callToApiByAxios(dataSet, success, failed) {
        axios(dataSet).then((response) => {
            if (success !== undefined) {
                success(response);
            }
        }).catch((error) => {
            if (failed !== undefined) {
                failed(error);
            }
        });
    }

    static getRequest(url, success, failed){
        let dataSet = {
            method: 'get',
            url: url
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    static postRequest(url, data, success, failed) {
        let dataSet = {
            method: 'post',
            url: url,
            data: data
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    static postJsonRequest(url, data, success, failed) {
        let dataSet = {
            method: 'post',
            url: url,
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    static deleteJsonRequest(url, data, success, failed) {
        let dataSet = {
            method: 'delete',
            url: url,
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    static postRequest(url, data, success, failed) {
        let dataSet = {
            method: 'post',
            url: url,
            data: data
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    static postJsonRequest(url, data, success, failed) {
        let dataSet = {
            method: 'post',
            url: url,
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    static deleteJsonRequest(url, data, success, failed) {
        let dataSet = {
            method: 'delete',
            url: url,
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };
        this.callToApiByAxios(dataSet, success, failed);
    }
}