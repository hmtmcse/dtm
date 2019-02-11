import React, {Component} from 'react';
import {LoginLayoutJss} from './../../assets/jss/login-layout-jss';
import {
    CssBaseline, Paper, Avatar, Typography, FormControl, InputLabel, Input, Button,
    withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {AuthenticationService} from "../../services/authentication-service";
import {AppConstant} from "./../../app/app-constant";
import {ApiURL} from "./../../app/api-url";


class LoginFormProcessor extends Component {

    constructor(props) {
        super(props);
    }

    doLogin = event => {
        const {parent, callBack} = this.props;
        event.preventDefault();
        if (this.state.email === "" || this.state.email == null) {
            parent.showErrorInfo("Please Enter Email.")
        } else if (this.state.password === "" || this.state.password == null) {
            parent.showErrorInfo("Please Enter Password.")
        } else {
            parent.postJsonToApi(ApiURL.UserLogin, {
                    email: this.state.email,
                    password: this.state.password
                }, success => {
                    let response = success.data;
                    if (!response.isSuccess) {
                        parent.showErrorInfo(response.message)
                    } else {
                        AuthenticationService.login(response);
                        if (callBack) {
                            callBack(success)
                        }
                    }
                }, failed => {
                    if (callBack) {
                        callBack(failed)
                    }
                }
            )
        }
    };

    handleChange = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    render() {
        const {classes} = this.props;
        const loginUI = (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar} src="/assets/logo-192x192.jpg"/>
                        <Typography variant="headline">{AppConstant.loginLabel}</Typography>
                        <form onSubmit={this.doLogin} className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" required name="email" autoComplete="email" autoFocus
                                       onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input required name="password" type="password" id="password"
                                       onChange={this.handleChange}/>
                            </FormControl>
                            <Button type="submit" fullWidth variant="raised" color="primary" children="Sign in"
                                    className={classes.submit}/>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
        return loginUI;
    }
}

LoginFormProcessor.propTypes = {
    classes: PropTypes.object.isRequired,
    parent: PropTypes.object.isRequired,
    callBack: PropTypes.object,
};
export default withStyles(LoginLayoutJss)(LoginFormProcessor);