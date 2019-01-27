import PropTypes from "prop-types";
import {
    Button, Card, Grid, Typography, withStyles
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";

const styles = theme => ({
    spaceInBottom : {
        marginBottom: "15px"
    },
});

class TodoMainDetailsPanel extends RaViewComponent {


    constructor(props) {
        super(props);
    }

    appRender() {
        const {allDetails, uiDefinition, classes} = this.props;
        let complexityStep = "";
        let estimation = "";
        if (uiDefinition.enableComplexityStepPanel){
            complexityStep = (<React.Fragment><strong>Total {uiDefinition.complexityStepPanelTitle}:</strong><strong style={{color:"blue"}}> {this.getValueFromObject(allDetails.summery, "totalStep", "0")}</strong> &nbsp;&nbsp;</React.Fragment>);
            estimation = (<React.Fragment><strong>Estimation:</strong><strong style={{color:"blue"}}> {this.getValueFromObject(allDetails.summery, "estimation", "0.0")}</strong> &nbsp;&nbsp;</React.Fragment>);
        }
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} >
                    <div className={classes.spaceInBottom}/>
                    <Typography align="center" paragraph={true}>
                        <strong>Total {uiDefinition.complexityPanelTitle}:</strong><strong style={{color:"blue"}}> {this.getValueFromObject(allDetails.summery, "totalComplexity", "0")}</strong> &nbsp;&nbsp;
                        {complexityStep}
                        {estimation}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(TodoMainDetailsPanel);


TodoMainDetailsPanel.propTypes = {
    allDetails: PropTypes.object.isRequired,
    uiDefinition: PropTypes.object.isRequired,
};

