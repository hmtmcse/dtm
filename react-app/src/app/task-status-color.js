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
        return (<Typography variant={variant} color="inherit" style={{
            borderLeft: '5px solid ' + TaskStatusColor.allColors[status],
            paddingLeft: '8px'
        }}>{text}</Typography>)
    },

    statusDivider: (status) => {
        return (<Divider light={true} style={{height:'2px', background: TaskStatusColor.allColors[status]}}/>)
    }

};