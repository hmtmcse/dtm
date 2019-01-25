import React, {Component} from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import {ListItemIcon, MenuItem} from "@material-ui/core";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import ErrorIcon from '@material-ui/icons/Error';
import ListIcon from '@material-ui/icons/List';
import _ from 'lodash';
import RaAlertDialog from "./ra-alert-dialog";


export default class RaTableAction extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        anchorEl: null,
        showConfirmationDialog: false,
        confirmDialogConfig: {},
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    confirmationHandler = (event, actionDefinition) => {
        if (actionDefinition.confirmation) {
            let confirmation = actionDefinition.confirmation;
            this.state.confirmDialogConfig = {
                title: confirmation.title,
                okayLabel: confirmation.okayLabel,
                cancelLabel: confirmation.cancelLabel,
                message: confirmation.message,
                okayFunction: event => {
                    if (confirmation.okayFunction) {
                        confirmation.okayFunction(event, actionDefinition);
                    } else if (actionDefinition.action) {
                        actionDefinition.action(event, actionDefinition);
                    }
                    this.setState({showConfirmationDialog: false})
                },
                cancelFunction: event => {
                    if (confirmation.cancelFunction) {
                        confirmation.cancelFunction(event, actionDefinition);
                    }
                    this.setState({showConfirmationDialog: false})
                }
            };
            this.setState({showConfirmationDialog: true});
        }
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const {tableActions} = this.props;
        return (
            <React.Fragment>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}>
                    <ListIcon/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            minWidth: 150,
                        },
                    }}>
                    {
                        _.map(tableActions, (actionDefinition, key) => {
                            return (
                                <MenuItem key={key} onClick={ event => {
                                    if (actionDefinition.confirmation) {
                                        this.confirmationHandler(event, actionDefinition)
                                    } else if (actionDefinition.action) {
                                        actionDefinition.action(event, actionDefinition)
                                    }
                                    this.handleClose();
                                }}>
                                    <ListItemIcon>
                                        {actionDefinition.icon ? (<actionDefinition.icon/>) : (<ErrorIcon/>)}
                                    </ListItemIcon>
                                    {actionDefinition.label}
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
                {this.state.showConfirmationDialog ? (<RaAlertDialog isOpen={this.state.showConfirmationDialog} {...this.state.confirmDialogConfig}/>): ""}
            </React.Fragment>
        );
    }
}
RaTableAction.propTypes = {
    tableActions: PropTypes.object.isRequired,
};


export class ActionDefinition {

    label = "";
    action = undefined;
    icon = ErrorIcon;
    confirmation = undefined;
    url = undefined;
    additionalInformation = undefined;
    component = undefined;

    constructor(label, action, icon) {
        this.label = label;
        this.action = action;
        this.icon = icon;
    }

    addAdditionalInfo(info){
        this.additionalInformation = info;
        return this;
    }

    setUrl(url){
        this.url = url;
        return this;
    }

    setComponent(component){
        this.component = component;
        return this;
    }

    addConfirmation(message = undefined) {
        this.confirmation = {
            title: "Confirm",
            message: message,
            okayLabel: "Confirm",
            okayFunction: null,
            cancelFunction: null,
            cancelLabel: "Cancel",
        };
        return this;
    }

    static commonActions(additionalInformation = undefined, component = undefined) {
        return {
            viewAction: ActionDefinition.instance("View", undefined, Visibility).addAdditionalInfo(additionalInformation).setComponent(component),
            editAction: ActionDefinition.instance("Edit", undefined, Edit).addAdditionalInfo(additionalInformation).setComponent(component),
            deleteAction: ActionDefinition.instance("Delete", undefined, Delete).addConfirmation("Are you sure want to Delete?").addAdditionalInfo(additionalInformation).setComponent(component),
        }
    }


    static instance(label, action, icon) {
        return new ActionDefinition(label, action, icon)
    }
}
