import React from 'react'
import RaViewComponent from "./../../../artifacts/ra-view-component";
import {
    Button,
    Paper, Typography
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {ApiURL} from "../../../app/api-url";
import {AppConstant} from "../../../app/app-constant";
import {viewCommon} from "../../../assets/jss/style-jss";
import Grid from "@material-ui/core/Grid/Grid";
import RaStaticHolder from "../../../artifacts/ra-static-holder";
import TodoChangeLogPanel from "./panel/todo-change-log-panel";
import TodoNotePanel from "./panel/todo-note-panel";
import TodoComplexityPanel from "./panel/todo-complexity-panel";
import TodoBugReportPanel from "./panel/todo-bug-report-panel";
import RaExpandableCard from "../../../artifacts/ra-expandable-card";
import {ActionDefinition} from "../../../artifacts/ra-table-action";
import PropTypes from "prop-types";


class TodoManipulationTray extends RaViewComponent {

    constructor(props) {
        super(props);
        this.state = {
            orderBy: "id",
            order: "desc",
            allDetails: {},
            complexityAndSteps: [],
            changeLogs: [],
            total: 0,
            max: AppConstant.rowsPerPage,
            offset: AppConstant.defaultOffset,
            isOpenTodoComplexity: false,
        };
    }

    componentDidMount() {
        this.showFlashMessage();
        this.loadAllDetails();
    }

    loadAllDetails() {
        let id = this.getValueFromParams("id");
        if (id) {
            const {uiDefinition} = this.props;
            let condition = {
                "id": id,
                "type": uiDefinition.complexityType,
            };
            this.postJsonToApi(ApiURL.TodoAllDetailsByCondition, condition, response => {
                let allDetails = response.data.response;
                this.setState({allDetails: allDetails});
                if (Object.getOwnPropertyNames(allDetails.complexity).length) {
                    this.setState({complexityAndSteps: allDetails.complexity});
                }
            });
        } else {
            RaStaticHolder.addMessageData("Invalid Todo Details", false);
            this.goToUrl("/todo");
        }
    }


    openTodoComplexity(event) {
        this.setState(state => ({
            isOpenTodoComplexity: true
        }));
    }


    appRender() {
        const {classes, uiDefinition} = this.props;
        let mainActions = info => {
            let actions = ActionDefinition.commonActions(info, this);
            delete (actions.viewAction);
            delete (actions.editAction);
            delete (actions.deleteAction);
            delete (actions.deleteAction);
            return actions;
        };

        let complexityPanelSpan = 8;
        let leftPanel = "";
        if (uiDefinition.enableChangeLogPanel || uiDefinition.enableNotePanel || uiDefinition.enableBugPanel) {
            leftPanel = (
                <Grid item xs={4}>
                    {uiDefinition.enableChangeLogPanel ? (<React.Fragment><TodoChangeLogPanel uiDefinition={uiDefinition} allDetails={this.state.allDetails}/><div className={classes.mainActionArea}/></React.Fragment>) : "" }
                    {uiDefinition.enableNotePanel ? (<React.Fragment><TodoNotePanel uiDefinition={uiDefinition} allDetails={this.state.allDetails}/><div className={classes.mainActionArea}/></React.Fragment>) : "" }
                    {uiDefinition.enableBugPanel ? (<React.Fragment><TodoBugReportPanel uiDefinition={uiDefinition} allDetails={this.state.allDetails}/><div className={classes.mainActionArea}/></React.Fragment>) : "" }
                </Grid>
            );
        } else {
            complexityPanelSpan = 12;
        }

        let todoName = (this.state.allDetails.name ? this.state.allDetails.name : "");
        return (
            <React.Fragment>
                <Paper className={classes.againMainActionArea}>
                    <div>
                        <Typography variant="headline">{uiDefinition.panelTitle}</Typography>
                    </div>
                    <div>
                        <Button className={classes.marginToLeft}  variant="contained" color="primary" onClick={event => {this.loadAllDetails();}}>Reload</Button>
                        <Button className={classes.marginToLeft} variant="contained" color="primary" onClick={event => {this.goToUrl("/todo");}}>Back</Button>
                    </div>
                </Paper>
                <Paper className={classes.mainActionArea}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <RaExpandableCard actions={mainActions(this.state.allDetails)} title={todoName} titleVariant="headline"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item xs={complexityPanelSpan}>
                                    <TodoComplexityPanel allDetails={this.state.allDetails} uiDefinition={uiDefinition}/>
                                    <div className={classes.againMainActionArea}/>
                                </Grid>
                                {leftPanel}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>);
    }
}

export default withStyles(viewCommon)(TodoManipulationTray);

TodoManipulationTray.propTypes = {
    uiDefinition: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};


export class TodoManipulationTrayDefinition {


    panelTitle = "";
    complexityType = "OTHERS";

    enableComplexityPanel = true;
    complexityPanelTitle = "Complexity";

    enableComplexityStepPanel = true;
    complexityStepPanelTitle = "Complexity Step";


    enableParallelTestingPanel = true;
    parallelTestingPanelTitle = "Parallel Testing";


    enableChangeLogPanel = true;
    changeLogPanelTitle = "Change Log";


    enableNotePanel = true;
    notePanelTitle = "Notes";


    enableBugPanel = true;
    bugPanelTitle = "Bug Reports";

    static instance() {
        return new TodoManipulationTrayDefinition()
    }
}
