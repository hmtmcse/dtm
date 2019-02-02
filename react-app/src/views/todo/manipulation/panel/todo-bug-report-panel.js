import PropTypes from "prop-types";
import {
    Button, Card, CardActions, Typography, CardContent
} from '@material-ui/core'
import React from 'react';
import TodoBugReportDialog from "../dialog/todo-bug-report-dialog";
import AddIcon from '@material-ui/icons/Add';
import RaExpandableCard, {ActionDefinition} from "../../../../artifacts/ra-expandable-card";
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {ApiURL} from "../../../../app/api-url";
import {withStyles} from '@material-ui/core/styles';
import {viewCommon} from "../../../../assets/jss/style-jss";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import RaMarkdown from "../../../../artifacts/ra-markdown";




class TodoBugReportPanel extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            formError: {},
            bugReports: [],
            allDetails: {},
            isOpenTodoBugReports: false,
            editId: undefined,
        };
    }


    componentDidUpdate(prevProps) {
        if (this.props.allDetails !== prevProps.allDetails) {
            this.setState({allDetails: this.props.allDetails});
            if (Object.getOwnPropertyNames(this.props.allDetails.bug).length) {
                this.setState({bugReports: this.props.allDetails.bug});
            }
        }
    }


    loadBugReports(callBack) {
        this.getToApi(ApiURL.BugReportGetDetailsByTodo + "?todoId=" + this.state.allDetails.id, response => {
            let responseData = response.data.response;
            if (responseData){
                this.setState({bugReports: responseData});
            }
            if (callBack){
                callBack();
            }
        });
    }

    openTodoBugReports(event, editId = undefined){
        this.setState(state => ({
            isOpenTodoBugReports: true,
            editId: editId,
        }));
    }

    deleteAction = (event, actionDefinition) =>{
        let additionalInformation = actionDefinition.additionalInformation;
        let component = actionDefinition.component;
        if (additionalInformation.id) {
            let formData = RaGsConditionMaker.equal({}, "id", additionalInformation.id);
            component.deleteJsonToApi(ApiURL.BugReportDelete, formData,
                success => {
                    component.loadBugReports();
                    component.showSuccessInfo("Successfully Deleted")
                },
                failed =>{
                    component.showSuccessInfo("Unable to Delete Data")
                }
            )
        }
    };

    editAction (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.openTodoBugReports(event, additionalInformation.id);
    };

    

    appRender() {
        let bugReportsActions = info => {
            let actions = ActionDefinition.commonActions(info, this);
            actions.editAction.action = this.editAction;
            delete (actions.viewAction);
            actions.deleteAction.action = this.deleteAction;
            return actions;
        };
        const {classes, uiDefinition} = this.props;
        return (
            <React.Fragment>
                {this.state.isOpenTodoBugReports ? (<TodoBugReportDialog parent={this} editId={this.state.editId} uiDefinition={uiDefinition}/>): ""}
                <Card>
                    <CardActions className={classes.mainActionArea}>
                        <div>
                            <Typography variant="headline" >{uiDefinition.bugPanelTitle}</Typography>
                        </div>
                        <div>
                            <Button onClick={(e) => {this.openTodoBugReports(e)}}><AddIcon/></Button>
                        </div>
                    </CardActions>
                    <CardContent>
                        {this.state.bugReports.map(function (bug, key) {
                            return (
                                <RaExpandableCard key={key}  actions={bugReportsActions(bug)} title={bug.name} children={<RaMarkdown content={bug.description}/>}/>
                            )
                        })}
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(viewCommon)(TodoBugReportPanel);

TodoBugReportPanel.propTypes = {
    allDetails: PropTypes.object.isRequired,
    uiDefinition: PropTypes.object.isRequired,
};


