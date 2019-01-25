import {Component} from "react";
import React from "react";
import {
    Typography
} from '@material-ui/core'
import PropTypes from "prop-types";


class RaFormItemView extends Component {
    render() {
        const {label, value, space} = this.props;
        let labelView = (label !== null ?
            <Typography variant="title" color="primary">{label}</Typography> : "");
        return (
            <React.Fragment>
                {labelView}
                <Typography variant="subheading">{value}</Typography>
                {space}
            </React.Fragment>
        );
    }
}

export default RaFormItemView;
RaFormItemView.propTypes = {
    label: PropTypes.node,
    value: PropTypes.node,
    space: PropTypes.node
};

RaFormItemView.defaultProps = {
    space: <br/>,
    label: null
};