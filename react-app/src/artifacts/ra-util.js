import {Fade, LinearProgress} from "@material-ui/core";
import React from "react";


export const RaUtil = {

    showLoader: (state) => {
        return (
            state ? (<Fade in={state}>
                <LinearProgress color="primary"/>
            </Fade>) : ""
        );
    },

    dateInputDateFormat: () => {
        let date = new Date();
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    },

    concatStringWithSpace: (first, second) => {
        let content = "";
        if (first !== undefined) {
            content = first
        }
        if (second) {
            content += " " + second;
        }
        return content;
    },

    isEmptyObject: (object) =>{
        if (!object) {
            return true;
        }
        return Object.getOwnPropertyNames(object).length === 0;
    },

    constantToHumanReadable: (text) => {
        if (text) {
            text = text.replace(/[_-]/g, " ").toLowerCase();
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
        return "";
    }




};