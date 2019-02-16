import React from "react";
import {ActionDefinition} from "../artifacts/ra-expandable-card";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import {TaskStatusColor} from "./task-status-color";
import {AppConstant} from "./app-constant";
import PagesIcon from '@material-ui/icons/Pages';
import {ListItemIcon} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ReceiptIcon from '@material-ui/icons/Receipt';

export const TodoCommonService = {

    changeStatusAction: (info, component, url, action) => {
        let status = ActionDefinition.instance("Change Status", undefined, AcUnitIcon).setComponent(component).addAdditionalInfo(info);

        let statusType = ActionDefinition.instanceForMenu("Processing", TaskStatusColor.statusOnText("Processing", AppConstant.PROCESSING)).setComponent(component).addAdditionalInfo(info);
        statusType.addToParam("status", AppConstant.PROCESSING).addToParam("url", url).addAction(action);
        status.addToMenu("processing", statusType);

        statusType = ActionDefinition.instanceForMenu("Done", TaskStatusColor.statusOnText("Done", AppConstant.DONE)).setComponent(component).addAdditionalInfo(info);
        statusType.addToParam("status", AppConstant.DONE).addToParam("url", url).addAction(action);
        status.addToMenu("done", statusType);

        statusType = ActionDefinition.instanceForMenu("Draft", TaskStatusColor.statusOnText("Draft", AppConstant.DRAFT)).setComponent(component).addAdditionalInfo(info);
        statusType.addToParam("status", AppConstant.DRAFT).addToParam("url", url).addAction(action);
        status.addToMenu("draft", statusType);

        statusType = ActionDefinition.instanceForMenu("Pending", TaskStatusColor.statusOnText("Pending", AppConstant.PENDING)).setComponent(component).addAdditionalInfo(info);
        statusType.addToParam("status", AppConstant.PENDING).addToParam("url", url).addAction(action);
        status.addToMenu("pending", statusType);

        statusType = ActionDefinition.instanceForMenu("Todo", TaskStatusColor.statusOnText("Todo", AppConstant.TODO)).setComponent(component).addAdditionalInfo(info);
        statusType.addToParam("status", AppConstant.TODO).addToParam("url", url).addAction(action);
        status.addToMenu("todo", statusType);

        statusType = ActionDefinition.instanceForMenu("Failed", TaskStatusColor.statusOnText("Failed", AppConstant.FAILED)).setComponent(component).addAdditionalInfo(info);
        statusType.addToParam("status", AppConstant.FAILED).addToParam("url", url).addAction(action);
        status.addToMenu("failed", statusType);

        return status;
    },

    quickAction: (info, component, url, action) => {
        let quick = ActionDefinition.instance("Quick Action", undefined, PagesIcon).setComponent(component).addAdditionalInfo(info);
        let itemIcon = ( <React.Fragment><ListItemIcon><FileCopyIcon/></ListItemIcon>Clone</React.Fragment>);
        let clone = ActionDefinition.instanceForMenu("Clone", itemIcon).setComponent(component).addAdditionalInfo(info).setUrl(url).addAction(action);
        quick.addToMenu("clone", clone);

        return quick;
    },

    addWorkLog: (info, component, action) => {
        return ActionDefinition.instance("Work Log", action, ReceiptIcon).setComponent(component).addAdditionalInfo(info);
    }

};