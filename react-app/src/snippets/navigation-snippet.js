import React from 'react'
import {
    AppBar, Divider, Drawer, IconButton, Grid,
    Icon, ListItemIcon, ListItemText, MenuItem, MenuList, Toolbar, Typography, withStyles
} from '@material-ui/core';
import { NavLink } from "react-router-dom";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import RaViewComponent from "../artifacts/ra-view-component";
import {navigationSnippetJSS} from "../assets/jss/navigation-snippet-jss";
import {AppConstant} from "../app/app-constant";
import {PrivateLayoutViews} from "../app/app-url-mapping";
import ProfileNavSnippet from "./profile-nav-snippet";


class NavigationSnippet extends RaViewComponent {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };


    appRender(){
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton,this.state.open && classes.menuButtonHidden)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap className={classes.title}>
                            {AppConstant.appName}
                        </Typography>
                        <ProfileNavSnippet/>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)}}>
                    <div className={classes.toolbarIcon}>
                        <Typography variant="title" color="primary" align="center" noWrap>
                            {AppConstant.navName}
                        </Typography>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <MenuList>
                        {PrivateLayoutViews.map((route, i) => {
                            if (route.isActive && route.isLeftNav){
                                return(
                                    <NavLink to={route.path} className={classes.removeDecoration} key={i}>
                                        <MenuItem button>
                                            <ListItemIcon>
                                                {typeof route.icon === "string" ? (
                                                    <Icon>{route.icon}</Icon>
                                                ) : (
                                                    <route.icon />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText primary={route.name} />
                                        </MenuItem>
                                    </NavLink>
                                )
                            }
                        })}
                    </MenuList>
                </Drawer>
            </React.Fragment>
        );
    }
}

NavigationSnippet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(navigationSnippetJSS)(NavigationSnippet);