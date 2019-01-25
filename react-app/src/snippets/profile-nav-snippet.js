import React, { Component } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    ListItemIcon, MenuItem, List, ListItem, ListItemText
} from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {AuthenticationService} from "../services/authentication-service";



export default class ProfileNavSnippet extends Component {


    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logout = event =>{
        event.preventDefault();
        AuthenticationService.logout();
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <React.Fragment>
                <AccountCircle onClick={this.handleClick}>
                    <MoreVertIcon />
                </AccountCircle >
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 48 * 4.5,
                            width: 200,
                        },
                    }}>
                    <MenuItem onClick={this.logout} key="Logout">
                        <ListItemIcon><ExitToApp/></ListItemIcon> Logout
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}
