import PropTypes from "prop-types";
import {
    Button, Card, Grid, Typography, withStyles
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {viewCommon} from "../../../../assets/jss/style-jss";

class TodoComplexityStepTitlePanel extends RaViewComponent {


    constructor(props) {
        super(props);
    }

    appRender() {
        const {step} = this.props;
        let estimation = (<React.Fragment>Estimation: {this.getValueFromObject(step.estimatedHour, "estimation", "0.0")} &nbsp;&nbsp;</React.Fragment>);
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} >
                    <Typography align="center">
                        {estimation}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(viewCommon)(TodoComplexityStepTitlePanel);


TodoComplexityStepTitlePanel.propTypes = {
    step: PropTypes.object.isRequired,
    parenComponent: PropTypes.object.isRequired,
};

