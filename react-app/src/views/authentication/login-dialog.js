import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from "prop-types";
import LoginFormProcessor from "./login-form-processor";
import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {LoginLayoutJss} from "../../assets/jss/login-layout-jss";

class LoginDialog extends Component {

    render() {
        const {parent, classes} = this.props;
        return (
            <Dialog open={true} fullWidth>
                <DialogContent className={classes.marginBottomForPopup} >
                    <LoginFormProcessor parent={parent}/>
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

