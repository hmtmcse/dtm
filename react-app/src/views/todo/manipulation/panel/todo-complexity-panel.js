import PropTypes from "prop-types";
import {
    Button, Card, CardActions, Typography, CardContent
} from '@material-ui/core'
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import RaExpandableCard from "../../../../artifacts/ra-expandable-card";
import {ActionDefinition} from "../../../../artifacts/ra-table-action";
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {ApiURL} from "../../../../app/api-url";
import {withStyles} from '@material-ui/core/styles';
import {viewCommon} from "../../../../assets/jss/style-jss";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import TodoComplexityDialog from "../dialog/todo-complexity-dialog";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TodoComplexityStepDialog from "../dialog/todo-complexity-step-dialog";
import TodoComplexityStepPanel from "./todo-complexity-step-panel";
import TodoComplexityView from "../view/todo-complexity-view";
import {TaskStatusColor} from "../../../../app/task-status-color";
import TodoComplexityTitlePanel from "../title-panel/todo-complexity-title-panel";
import TodoComplexityDetailsPanel from "../details-panel/todo-complexity-details-panel";




class TodoComplexityPanel extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            formError: {},
            complexityAndSteps: [],
            complexityState: [],
            allDetails: {},
            isViewTodoComplexity: false,
            isOpenTodoComplexity: false,
            isOpenTodoComplexityStep: false,
            editId: undefined,
            viewId: undefined,
            todoId: undefined,
            complexityId: undefined,
        };
    }


    componentDidUpdate(prevProps) {
        if (this.props.allDetails !== prevProps.allDetails) {
            this.setState({allDetails: this.props.allDetails});
            if (Object.getOwnPropertyNames(this.props.allDetails.complexity).length) {
                this.setState({complexityAndSteps: this.props.allDetails.complexity});
            }
        }
    }

    loadComplexity(callBack) {
        const {uiDefinition, parentComponent} = this.props;
        parentComponent.loadAllDetails(callBack);
    }

    loadComplexityStep(callBack){
        this.loadComplexity(callBack);
    }

    openTodoComplexity(event, editId = undefined){
        this.setState(state => ({
            isOpenTodoComplexity: true,
            editId: editId,
        }));
    }

    openTodoComplexityStep(event, complexityId = undefined){
        this.setState(state => ({
            isOpenTodoComplexityStep: true,
            complexityId: complexityId,
            todoId: state.allDetails.id,
        }));
    }

    viewTodoComplexity(event, viewId = undefined){
        this.setState(state => ({
            isViewTodoComplexity: true,
            viewId: viewId,
        }));
    }

    addStepAction(event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.openTodoComplexityStep(event, additionalInformation.id);
    };

    deleteAction = (event, actionDefinition) =>{
        let additionalInformation = actionDefinition.additionalInformation;
        let component = actionDefinition.component;
        if (additionalInformation.id) {
            let formData = RaGsConditionMaker.equal({}, "id", additionalInformation.id);
            component.deleteJsonToApi(ApiURL.ComplexityDelete, formData,
                success => {
                    let data = response.data;
                    if(data.isSuccess){
                        component.loadComplexity();
                        component.showSuccessInfo("Successfully Deleted")
                    }else{
                        parent.showErrorInfo(data.message);
                        this.closePopup();
                    }
                },
                failed =>{
                    component.showErrorInfo("Unable to Delete Data")
                }
            )
        }
    };

    editAction (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.openTodoComplexity(event, additionalInformation.id);
    };

    viewAction (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.viewTodoComplexity(event, additionalInformation.id);
    };


    sortComplexityAndSteps(result, data, url){
        const [removed] = data.splice(result.source.index, 1);
        data.splice(result.destination.index, 0, removed);
        let dbUpdateData = [];
        data.slice().reverse().map(function (complexity, key) {
            dbUpdateData.push({
                "index": key,
                "dbId": complexity.id,
            })
        });
        this.postJsonToApi(url, {itemMap: dbUpdateData});
        return data;
    }


    complexityAndStepOnDragEnd(result) {
        if (!result.destination) {
            return;
        }
        if (result.type === "complexity"){
            const data = this.sortComplexityAndSteps(result, Array.from(this.state.complexityAndSteps), ApiURL.ComplexitySaveSort);
            this.setState({complexityAndSteps: data});
        }else{
            const data = this.sortComplexityAndSteps(result, Array.from(this.state.complexityAndSteps[Number(result.source.droppableId)].steps), ApiURL.StepSaveSort);
            this.setState({complexityAndSteps: data});
            let oldData = this.state.complexityAndSteps;
            oldData[Number(result.source.droppableId)].steps = data;
            this.setState({complexityAndSteps: oldData});
        }
    }

    appRender() {
        const {classes, uiDefinition} = this.props;
        let noteActions = info => {
            let actions = ActionDefinition.commonActions(info, this);
            let createStep = ActionDefinition.instance("Add " + uiDefinition.complexityStepPanelTitle, this.addStepAction, PlaylistAdd).setComponent(this).addAdditionalInfo(info);
            actions.editAction.action = this.editAction;
            actions.deleteAction.action = this.deleteAction;
            actions.viewAction.action = this.viewAction;


            let actionList = {};
            if (uiDefinition.enableComplexityStepPanel) {
                actionList.createStep = createStep;
            }
            actionList.viewAction = actions.viewAction;
            actionList.editAction = actions.editAction;
            actionList.deleteAction = actions.deleteAction;
            return actionList;
        };
        let thisParent = this;
        return (
            <React.Fragment>
                {this.state.isViewTodoComplexity ? (<TodoComplexityView parent={this} viewId={this.state.viewId} uiDefinition={uiDefinition}/>): ""}
                {this.state.isOpenTodoComplexity ? (<TodoComplexityDialog parent={this} editId={this.state.editId} uiDefinition={uiDefinition}/>): ""}
                {this.state.isOpenTodoComplexityStep ? (<TodoComplexityStepDialog parent={this} complexityId={this.state.complexityId} todoId={this.state.todoId} uiDefinition={uiDefinition}/>): ""}
                <Card>
                    <CardActions className={classes.mainActionArea}>
                        <div>
                            <Typography variant="headline" >{uiDefinition.complexityPanelTitle}</Typography>
                        </div>
                        <div>
                            <Button onClick={(e) => {this.openTodoComplexity(e)}}><AddIcon/></Button>
                        </div>
                    </CardActions>
                    <CardContent>
                        <DragDropContext onDragEnd={(result)=>{this.complexityAndStepOnDragEnd(result)}}>
                            <Droppable droppableId="complexityDropAble" type="complexity">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}>
                                        {this.state.complexityAndSteps.map(function (complexity, key) {
                                            return (
                                                <Draggable key={complexity.id} draggableId={complexity.id} index={key}>
                                                    {(provided, snapshot) => (
                                                        <div ref={provided.innerRef}
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}>
                                                            <RaExpandableCard key={key} cardActionMiddleChildren={<TodoComplexityTitlePanel parenComponent={thisParent} complexity={complexity} uiDefinition={uiDefinition}/>} cardTop={TaskStatusColor.statusDivider(complexity.status)} actions={noteActions(complexity)} title={complexity.name}
                                                                              children={ uiDefinition.enableComplexityStepPanel ?
                                                                                  (<TodoComplexityStepPanel parent={thisParent} stepIdentity={key} complexity={complexity} uiDefinition={uiDefinition}/>)
                                                                                  : (<TodoComplexityDetailsPanel complexity={complexity}/>)
                                                                                  }/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}
export default withStyles(viewCommon)(TodoComplexityPanel);

TodoComplexityPanel.propTypes = {
    allDetails: PropTypes.object.isRequired,
    uiDefinition: PropTypes.object.isRequired,
    parentComponent: PropTypes.object.isRequired,
};


