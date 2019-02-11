import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from "prop-types";
import LoginFormProcessor from "./login-form-processor";
import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {LoginLayoutJss} from "../../assets/jss/login-layout-jss";
import RaStaticHolder from "../../artifacts/ra-static-holder";

class LoginDialog extends Component {

    callback = response => {
        const {parent} = this.props;
        let data = response.data;
        if (data.isSuccess) {
            parent.setState({showLoginPopup: false});
            Object.entries(RaStaticHolder.requestStack).map(([objectKey, objectValue], key) => {
                parent.callToApiByAxios(objectValue.dataSet, objectValue.success, objectValue.failed)
            });
            RaStaticHolder.requestStack = {};
        } else {
            parent.showErrorInfo("Sorry Unable to Login.");
        }
    };

    render() {
        const {parent, classes} = this.props;
        if (parent.state.loginSuccessData.dataSet.url) {
            RaStaticHolder.requestStack[parent.state.loginSuccessData.dataSet.url] = parent.state.loginSuccessData;
        }
        return (
            <Dialog open={true} fullWidth>
                <DialogContent className={classes.marginBottomForPopup} >
                    <LoginFormProcessor parent={parent} callBack={this.callback}/>
                </DialogContent>
            </Dialog>
        );
    }
}

LoginDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    parent: PropTypes.object.isRequired,
};
export default withStyles(LoginLayoutJss)(LoginDialog);

