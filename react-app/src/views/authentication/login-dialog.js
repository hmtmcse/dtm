import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {
    Button
} from '@material-ui/core'
import LoginFormProcessor from "./login-form-processor";
import React, {Component} from 'react';

export default class LoginDialog extends Component {

    render() {
        const {parent} = this.props;
        return (
            <Dialog open={true} fullWidth>
                <DialogContent>
                    <LoginFormProcessor parent={parent}/>
                </DialogContent>
            </Dialog>
        );
    }
}

LoginDialog.propTypes = {
    parent: PropTypes.object.isRequired,
};

