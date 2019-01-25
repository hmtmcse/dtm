import React, {Component} from 'react';
import RaViewComponent from "../../artifacts/ra-view-component";
import NavigationSnippet from "../../snippets/navigation-snippet";
import {AuthenticationService} from "../../services/authentication-service";
import {AppConstant} from "../../app/app-constant";
import {Redirect} from "react-router-dom";
import {CssBaseline, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {mainLayoutJSS} from "../../assets/jss/style-jss";

class PrivateLayout extends RaViewComponent {

    appRender() {
        const { classes} = this.props;
        const Component = this.props.component;
        const route = this.props.route;

        let renderView = (<div className={classes.root}>
            <NavigationSnippet/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Component route={route}/>
            </main>
        </div>);

        if (!AuthenticationService.isAuthenticated()){
            renderView = (<Redirect to={AppConstant.loginUrl}/>);
        }

        return (
            <React.Fragment>
                <CssBaseline/>
                {renderView}
            </React.Fragment>
        );
    }
}

PrivateLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(mainLayoutJSS)(PrivateLayout);