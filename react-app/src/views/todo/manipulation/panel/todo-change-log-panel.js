import PropTypes from "prop-types";
import {
    Button, Card, CardActions, Typography, CardContent
} from '@material-ui/core'
import React from 'react';
import TodoChangeLogDialog from "../dialog/todo-change-log-dialog";
import AddIcon from '@material-ui/icons/Add';
import RaExpandableCard from "../../../../artifacts/ra-expandable-card";
import {ActionDefinition} from "../../../../artifacts/ra-table-action";
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {ApiURL} from "../../../../app/api-url";
import {withStyles} from '@material-ui/core/styles';
import {viewCommon} from "../../../../assets/jss/style-jss";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import RaMarkdown from "../../../../artifacts/ra-markdown";




class TodoChangeLogPanel extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            formError: {},
            changeLogs: [],
            allDetails: {},
            isOpenTodoChangeLog: false,
            editId: undefined,
        };
    }


    componentDidUpdate(prevProps) {
        if (this.props.allDetails !== prevProps.allDetails) {
            this.setState({allDetails: this.props.allDetails});
            if (Object.getOwnPropertyNames(this.props.allDetails.changeLog).length) {
                this.setState({changeLogs: this.props.allDetails.changeLog});
            }
        }
    }

    loadChangeLog(callBack) {
        this.getToApi(ApiURL.ChangeLogGetDetailsByTodo + "?todoId=" + this.state.allDetails.id, response => {
            let responseData = response.data.response;
            if (responseData){
                this.setState({changeLogs: responseData});
            }
            if (callBack){
                callBack();
            }
        });
    }

    openTodoChangeLog(event, editId = undefined){
        this.setState(state => ({
            isOpenTodoChangeLog: true,
            editId: editId,
        }));
    }

    deleteAction = (event, actionDefinition) =>{
        let additionalInformation = actionDefinition.additionalInformation;
        let component = actionDefinition.component;
        if (additionalInformation.id) {
            let formData = RaGsConditionMaker.equal({}, "id", additionalInformation.id);
            component.deleteJsonToApi(ApiURL.ChangeLogDelete, formData,
                success => {
                    component.loadChangeLog();
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
        actionDefinition.component.openTodoChangeLog(event, additionalInformation.id);
    };



    appRender() {
        let changeLogActions = info => {
            let actions = ActionDefinition.commonActions(info, this);
            actions.editAction.action = this.editAction;
            delete (actions.viewAction);
            actions.deleteAction.action = this.deleteAction;
            return actions;
        };
        const {classes, uiDefinition} = this.props;
        return (
            <React.Fragment>
                {this.state.isOpenTodoChangeLog ? (<TodoChangeLogDialog parent={this} editId={this.state.editId} uiDefinition={uiDefinition}/>): ""}
                <Card>
                    <CardActions className={classes.mainActionArea}>
                        <div>
                            <Typography variant="headline" >{uiDefinition.changeLogPanelTitle}</Typography>
                        </div>
                        <div>
                            <Button onClick={(e) => {this.openTodoChangeLog(e)}}><AddIcon/></Button>
                        </div>
                    </CardActions>
                    <CardContent>
                        {this.state.changeLogs.map(function (changeLog, key) {
                            return (
                                <RaExpandableCard key={key}  actions={changeLogActions(changeLog)} title={changeLog.name} children={<RaMarkdown content={changeLog.description}/>}/>
                            )
                        })}
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(viewCommon)(TodoChangeLogPanel);

TodoChangeLogPanel.propTypes = {
    allDetails: PropTypes.object.isRequired,
    uiDefinition: PropTypes.object.isRequired,
};


