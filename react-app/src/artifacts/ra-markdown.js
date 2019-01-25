import React, {Component} from 'react';
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper/Paper";
import {withStyles} from '@material-ui/core/styles';
import ReactMarkdown from "react-markdown";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
});

class RaMarkdown extends Component {
    render() {
        const {content, enablePaper, classes} = this.props;
        let render = "";
        if (enablePaper) {
            render = <Paper className={classes.root}><ReactMarkdown children={content}/></Paper>
        } else {
            render = (<ReactMarkdown children={content}/>);
        }
        return render;
    }
}

export default withStyles(styles)(RaMarkdown);

RaMarkdown.propTypes = {
    content: PropTypes.string,
    enablePaper: PropTypes.bool,
};

RaMarkdown.defaultProps = {
    content: "",
    enablePaper: true,
};
