import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import RaViewComponent from "../../artifacts/ra-view-component";
import {Grid} from "@material-ui/core";
import DashboardTodoReport from "./dasboard-todo-report";


const styles = theme => ({
    root: {
        color:'blue'
    }
});

class DashboardView extends RaViewComponent {
    appRender () {
        const { classes } = this.props;
        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <DashboardTodoReport/>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(DashboardView);