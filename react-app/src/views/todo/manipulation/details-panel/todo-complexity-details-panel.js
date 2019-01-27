import PropTypes from "prop-types";
import {
    Button, Card, Grid, Typography, withStyles
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {viewCommon} from "../../../../assets/jss/style-jss";
import RaMarkdown from "../../../../artifacts/ra-markdown";

class TodoComplexityDetailsPanel extends RaViewComponent {


    constructor(props) {
        super(props);
    }

    appRender() {
        const {complexity} = this.props;
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} >
                    {complexity.description ? (<RaMarkdown content={complexity.description} titlePanel={<Typography align="left"><strong style={{color:"blue"}}>Description</strong></Typography>}/>) : ""}
                </Grid>
                <Grid item xs={12} >
                    {complexity.reference ? (<RaMarkdown content={complexity.reference} titlePanel={<Typography align="left"><strong style={{color:"blue"}}>Reference</strong></Typography>}/>) : ""}
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(viewCommon)(TodoComplexityDetailsPanel);


TodoComplexityDetailsPanel.propTypes = {
    complexity: PropTypes.object.isRequired,
};

