import PropTypes from "prop-types";
import {
    Button, Card, CardActions, Typography, CardContent
} from '@material-ui/core'
import React from 'react';
import RaExpandableCard from "../../../../artifacts/ra-expandable-card";
import {ActionDefinition} from "../../../../artifacts/ra-table-action";
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {ApiURL} from "../../../../app/api-url";
import {withStyles} from '@material-ui/core/styles';
import {viewCommon} from "../../../../assets/jss/style-jss";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TodoComplexityStepDialog from "../dialog/todo-complexity-step-dialog";
import {TaskStatusColor} from "../../../../app/task-status-color";
import TodoComplexityStepDetailsPanel from "../details-panel/todo-complexity-step-details-panel";




class TodoComplexityStepPanel extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            formError: {},
            complexitySteps: [],
            complexity: {},
            isOpenTodoComplexityStep: false,
            editId: undefined,
        };
    }


    componentDidMount() {
        if (Object.getOwnPropertyNames(this.props.complexity).length) {
            this.setState({complexity: this.props.complexity});
            if (this.props.complexity && this.props.complexity.steps && Object.getOwnPropertyNames(this.props.complexity.steps).length) {
                this.setState({complexitySteps: this.props.complexity.steps});
            }
        }
    }


    componentDidUpdate(prevProps) {
        if (this.props.complexity !== prevProps.complexity) {
            this.setState({complexity: this.props.complexity});
            if (this.props.complexity && this.props.complexity.steps &&  Object.getOwnPropertyNames(this.props.complexity.steps).length) {
                this.setState({complexitySteps: this.props.complexity.steps});
            }
        }

        if (this.props.complexity.steps !== this.state.complexitySteps && this.props.complexity.steps && Object.getOwnPropertyNames(this.props.complexity.steps).length) {
            this.setState({complexitySteps: this.props.complexity.steps});
        }
    }

    loadComplexityStep(callBack) {
        const {parent} = this.props;
        parent.loadComplexityStep(callBack);
    }

    openTodoComplexityStep(event, editId = undefined){
        console.log(editId);
        this.setState(state => ({
            isOpenTodoComplexityStep: true,
            editId: editId,
        }));
    }

    deleteAction = (event, actionDefinition) =>{
        let additionalInformation = actionDefinition.additionalInformation;
        let component = actionDefinition.component;
        if (additionalInformation.id) {
            let formData = RaGsConditionMaker.equal({}, "id", additionalInformation.id);
            component.deleteJsonToApi(ApiURL.StepDelete, formData,
                success => {
                    component.loadComplexityStep();
                    component.showSuccessInfo("Successfully Deleted")
                },
                failed =>{
                    component.showErrorInfo("Unable to Delete Data");
                }
            )
        }
    };

    editAction (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.openTodoComplexityStep(event, additionalInformation.id);
    };


    appRender() {
        let noteActions = info => {
            let actions = ActionDefinition.commonActions(info, this);
            actions.editAction.action = this.editAction;
            delete (actions.viewAction);
            actions.deleteAction.action = this.deleteAction;
            return actions;
        };
        const {stepIdentity, uiDefinition} = this.props;
        return (
            <React.Fragment>
                {this.state.isOpenTodoComplexityStep ? (<TodoComplexityStepDialog uiDefinition={uiDefinition} parent={this} complexityId={this.state.complexityId} todoId={this.state.todoId} editId={this.state.editId}/>): ""}
                <Card>
                    <CardContent>
                        <Droppable droppableId={stepIdentity + ""} type={"steps-" + stepIdentity}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}>
                                    {this.state.complexitySteps.map(function (step, key) {
                                        return (
                                            <Draggable key={step.uuid} draggableId={step.uuid} index={key}>
                                                {(provided, snapshot) => (
                                                    <div ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}>
                                                        <RaExpandableCard  actions={noteActions(step)} cardTop={TaskStatusColor.statusDivider(step.status)} title={step.name} children={<TodoComplexityStepDetailsPanel stepDetails={step}/>}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(viewCommon)(TodoComplexityStepPanel);

TodoComplexityStepPanel.propTypes = {
    complexity: PropTypes.object.isRequired,
    stepIdentity: PropTypes.number.isRequired,
    parent: PropTypes.object.isRequired,
    uiDefinition: PropTypes.object.isRequired,
};


