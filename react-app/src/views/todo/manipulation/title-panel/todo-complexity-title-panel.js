import PropTypes from "prop-types";
import {
    Button, Card, Grid, Typography, withStyles
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {viewCommon} from "../../../../assets/jss/style-jss";

class TodoComplexityTitlePanel extends RaViewComponent {


    constructor(props) {
        super(props);
    }

    appRender() {
        const {complexity, uiDefinition} = this.props;
        let complexityStep = (<React.Fragment>{uiDefinition.complexityStepPanelTitle}: {this.getValueFromObject(complexity.stepSummery, "totalStep", "0")} &nbsp;&nbsp;</React.Fragment>);
        let estimation = (<React.Fragment>Estimation: {this.getValueFromObject(complexity.stepSummery, "estimation", "0.0")} &nbsp;&nbsp;</React.Fragment>);
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} >
                    <Typography align="center">
                        {complexityStep}
                        {estimation}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(viewCommon)(TodoComplexityTitlePanel);


TodoComplexityTitlePanel.propTypes = {
    complexity: PropTypes.object.isRequired,
    uiDefinition: PropTypes.object.isRequired,
    parenComponent: PropTypes.object.isRequired,
};

