import React from "react";
import {ApiURL} from "../app/api-url";
import RaHttpUtil from "../artifacts/ra-http-util";
import RaBrowserStorage from "../artifacts/ra-browser-storage";


const CommonDropDownConstant = "CommonDropDownConstant";
const CommonTodoFilterDropDownContent = "CommonTodoFilterDropDownContent";

const loadDataURL = {
    CommonDropDownConstant: ApiURL.CommonDropDownConstant,
    CommonTodoFilterDropDownContent: ApiURL.CommonTodoFilterDropDownContent,
}

export const DropDownStaticDataHolder = {

    loadData: (url, callback) => {
        RaHttpUtil.getRequest(url, response => {
            if (callback) {
                callback(response)
            }
        })
    },

    clearAllCache: () => {

    },

    loadAndProcessData: (url) => {
        let callback = response =>{
            console.log(response);
        }
    },

    readCommonDropDownConstantMapValue: (mapName, mapKey) =>{
        let map = RaBrowserStorage.getByKeyFromSession(mapName);
        if (map === null || undefined){
            DropDownStaticDataHolder.loadData(ApiURL.CommonDropDownConstant, response => {
                console.log(response);
            });
        }
    },

    getConstant: (mapName, mapKey) => {
        switch (mapName) {
            case "status":

                break;

        }

    }


};