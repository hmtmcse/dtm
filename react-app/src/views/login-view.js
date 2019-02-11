import React from 'react';
import PropTypes from 'prop-types';
import RaViewComponent from "../artifacts/ra-view-component";
import {RaUrlUtil} from "../artifacts/ra-url-util";
import {AppConstant} from "./../app/app-constant";
import LoginFormProcessor from "./authentication/login-form-processor";


export default class LoginView extends RaViewComponent {

    constructor(props) {
        super(props);
    }

    callback = response => {
        RaUrlUtil.redirectTo(AppConstant.loginSuccessUrl)
    };

    appRender() {
        return (<LoginFormProcessor parent={this} callBack={this.callback}/>);
    }
}

LoginView.propTypes = {
    classes: PropTypes.object.isRequired,
};
