import React from "react";
import {RaUtil} from "../artifacts/ra-util";

export const CommonService = {

    userSelectData: (data, defaultSelectData = null) => {
        let select = [];
        if (defaultSelectData) {
            select.push(defaultSelectData);
        }
        Object.entries(data).map(([objectKey, user], key) => {
            select.push({label: RaUtil.concatStringWithSpace(user.firstName, user.lastName), value: user.id});
        });
        return select;
    },

    nameToLatter: (firstName, lastName) => {
        let latter = "";
        if (firstName){
            latter = firstName.charAt(0);
        }
        if (lastName){
            latter += lastName.charAt(0);
        }
        return latter.toUpperCase();
    }
};