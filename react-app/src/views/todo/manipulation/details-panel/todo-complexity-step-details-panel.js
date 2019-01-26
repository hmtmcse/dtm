import PropTypes from "prop-types";
import {
    Button, Card, Grid, CardContent, withStyles
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {viewCommon} from "../../../../assets/jss/style-jss";
import Typography from "@material-ui/core/es/Typography/Typography";
import RaMarkdown from "../../../../artifacts/ra-markdown";

class TodoComplexityStepDetailsPanel extends RaViewComponent {


    constructor(props) {
        super(props);
    }

    appRender() {
        const {stepDetails} = this.props;
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} >
                    {stepDetails.description ? (<RaMarkdown content={stepDetails.description} titlePanel={<Typography align="left"><strong style={{color:"blue"}}>Description</strong></Typography>}/>) : ""}
                </Grid>
                <Grid item xs={12} >
                    {stepDetails.reference ? (<RaMarkdown content={stepDetails.reference} titlePanel={<Typography align="left"><strong style={{color:"blue"}}>Reference</strong></Typography>}/>) : ""}
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(viewCommon)(TodoComplexityStepDetailsPanel);


TodoComplexityStepDetailsPanel.propTypes = {
    stepDetails: PropTypes.object.isRequired,
};

