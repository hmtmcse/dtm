import React from 'react';
import {LoginLayoutJss} from './../assets/jss/login-layout-jss';
import {
    CssBaseline, Paper, Avatar, Typography, FormControl, InputLabel, Input, Button,
    withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/LockOutlined';
import {AuthenticationService} from "../services/authentication-service";
import RaViewComponent from "../artifacts/ra-view-component";
import {RaUrlUtil} from "../artifacts/ra-url-util";
import {AppConstant} from "./../app/app-constant";
import {ApiURL} from "./../app/api-url";


class LoginView extends RaViewComponent {

    constructor(props) {
        super(props);
    }

    doLogin = event => {
        event.preventDefault();
        if (this.state.email === "" || this.state.email == null) {
            this.showErrorInfo("Please Enter Email.")
        } else if (this.state.password === "" || this.state.password == null) {
            this.showErrorInfo("Please Enter Password.")
        } else {
            this.postJsonToApi(ApiURL.UserLogin, {email: this.state.email, password: this.state.password},
                success => {
                    let response = success.data;
                    if (!response.isSuccess) {
                        this.showErrorInfo(response.message)
                    } else {
                        AuthenticationService.login(response);
                        RaUrlUtil.redirectTo(AppConstant.loginSuccessUrl)
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

    appRender() {
        const {classes} = this.props;

        const loginUI = (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
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

LoginView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(LoginLayoutJss)(LoginView);