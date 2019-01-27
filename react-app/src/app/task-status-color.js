import {
    Typography, Divider
} from "@material-ui/core";
import React from "react";

export const TaskStatusColor = {

    allColors: {
        "DRAFT": "black",
        "DONE": "LimeGreen",
        "PROCESSING": "coral",
        "PENDING": "blue",
        "TODO": "cyan",
        "FAILED": "red",
    },

    statusOnText: (text, status, variant = "") => {
        let attributes = {
            color: "inherit",
            style: {borderLeft: '5px solid ' + TaskStatusColor.allColors[status], paddingLeft: '8px'}
        };
        if (variant !== "") {
            attributes.variant = variant;
        }
        return (<Typography {...attributes}>{text}</Typography>)
    },

    statusDivider: (status) => {
        return (<Divider light={true} style={{height:'2px', background: TaskStatusColor.allColors[status]}}/>)
    }

};