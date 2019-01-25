import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";

class RaAlertDialog extends Component {

    render() {
        const { isOpen, title, message, okayLabel, cancelLabel, okayFunction, cancelFunction } = this.props;
        return (
            <Dialog
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={okayFunction} color="primary">{okayLabel}</Button>
                    <Button onClick={cancelFunction} color="primary" autoFocus>{cancelLabel}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default RaAlertDialog;

RaAlertDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    okayLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    okayFunction: PropTypes.func.isRequired,
    cancelFunction: PropTypes.func.isRequired,
};

RaAlertDialog.defaultProps = {
    title: "Confirm",
    okayLabel: "Confirm",
    cancelLabel: "Cancel",
};
