import PropTypes from "prop-types";
import {
    Card, CardContent
} from '@material-ui/core'
import React from 'react';
import RaExpandableCard, {ActionDefinition} from "../../../../artifacts/ra-expandable-card";
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {ApiURL} from "../../../../app/api-url";
import {withStyles} from '@material-ui/core/styles';
import {viewCommon} from "../../../../assets/jss/style-jss";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import {Draggable, Droppable} from "react-beautiful-dnd";
import TodoComplexityStepDialog from "../dialog/todo-complexity-step-dialog";
import {TaskStatusColor} from "../../../../app/task-status-color";
import TodoComplexityStepDetailsPanel from "../details-panel/todo-complexity-step-details-panel";
import TodoComplexityStepTitlePanel from "../title-panel/todo-complexity-step-title-panel";
import {TodoCommonService} from "../../../../app/todo-common-service";


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
            if (this.props.complexity && this.props.complexity.steps && Object.getOwnPropertyNames(this.props.complexity.steps).length) {
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

    openTodoComplexityStep(event, editId = undefined) {
        this.setState(state => ({
            isOpenTodoComplexityStep: true,
            editId: editId,
        }));
    }

    deleteAction = (event, actionDefinition) => {
        let additionalInformation = actionDefinition.additionalInformation;
        let component = actionDefinition.component;
        if (additionalInformation.id) {
            let formData = RaGsConditionMaker.equal({}, "id", additionalInformation.id);
            component.deleteJsonToApi(ApiURL.StepSoftDelete, formData,
                success => {
                    component.loadComplexityStep();
                    component.showSuccessInfo("Successfully Deleted")
                },
                failed => {
                    component.showErrorInfo("Unable to Delete Data");
                }
            )
        }
    };

    editAction(event, actionDefinition) {
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.openTodoComplexityStep(event, additionalInformation.id);
    };

    updateStepStatus(formData) {
        const {uiDefinition, parent} = this.props;
        parent.updateComplexityOrStepStatus(formData, ApiURL.StepChangeStatus);
    }

    changeStatus(event, actionDefinition) {
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.updateStepStatus({
            id: additionalInformation.id,
            status: actionDefinition.params.status
        });
    }


    clone(event, actionDefinition) {
        const {parent} = actionDefinition.component.props;
        parent.clone(event, actionDefinition);
    }

    appRender() {
        let noteActions = info => {
            let actions = ActionDefinition.commonActions(info, this);
            actions.editAction.action = this.editAction;
            actions.deleteAction.action = this.deleteAction;
            let actionList = {};
            actionList.status = TodoCommonService.changeStatusAction(info, this, "", this.changeStatus);
            actionList.quickAction = TodoCommonService.quickAction(info, this, ApiURL.StepClone, this.clone);
            actionList.editAction = actions.editAction;
            actionList.deleteAction = actions.deleteAction;
            return actionList;
        };
        const {stepIdentity, uiDefinition} = this.props;
        let thisParent = this;
        return (
            <React.Fragment>
                {this.state.isOpenTodoComplexityStep ? (
                    <TodoComplexityStepDialog uiDefinition={uiDefinition} parent={this}
                                              complexityId={this.state.complexityId} todoId={this.state.todoId}
                                              editId={this.state.editId}/>) : ""}
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
                                                        <RaExpandableCard
                                                            cardActionMiddleChildren={<TodoComplexityStepTitlePanel
                                                                parenComponent={thisParent} step={step}/>}
                                                            actions={noteActions(step)}
                                                            cardTop={TaskStatusColor.statusDivider(step.status)}
                                                            title={step.name} children={<TodoComplexityStepDetailsPanel
                                                            stepDetails={step}/>}/>
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


