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
}