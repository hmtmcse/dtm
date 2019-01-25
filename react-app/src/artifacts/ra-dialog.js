import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";

class RaDialog extends Component {

    render() {
        const { isOpen, title, okayLabel, cancelLabel, okayFunction, cancelFunction, maxWidth, children } = this.props;
        return (
            <Dialog open={isOpen} maxWidth={maxWidth}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={okayFunction} color="primary">{okayLabel}</Button>
                    <Button onClick={cancelFunction} color="primary" autoFocus>{cancelLabel}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default RaDialog;

RaDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    okayLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    okayFunction: PropTypes.func.isRequired,
    cancelFunction: PropTypes.func.isRequired,
    maxWidth: PropTypes.node,
    children: PropTypes.node.isRequired,
};

RaDialog.defaultProps = {
    title: "Confirm",
    okayLabel: "Confirm",
    cancelLabel: "Cancel",
    maxWidth: false,
};
