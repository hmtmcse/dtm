import React from 'react'
import RaViewComponent from "./../../artifacts/ra-view-component";
import {
    DateAndTimePickers, Badge,
    TableRow, TableCell, TableBody, Paper, Table, Typography,Button,TextField
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import RaTableHeader, {RaTableHeaderDefinition} from './../../artifacts/ra-table-header';
import RaPagination from './../../artifacts/ra-pagination';
import RaTableAction, {ActionDefinition} from "../../artifacts/ra-table-action";
import {RaGsConditionMaker} from "../../artifacts/ra-gs-condition-maker";
import {ApiURL} from "../../app/api-url";
import {AppConstant} from "../../app/app-constant";
import {viewCommon} from "../../assets/jss/style-jss";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Grid from "@material-ui/core/Grid/Grid";
import {RaUtil} from "../../artifacts/ra-util";
import TodoEditDialog from "./todo-edit-dialog";
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PublishIcon from '@material-ui/icons/CloudDone';
import UnpublishIcon from '@material-ui/icons/CloudDownload';
import TodoDevComplexityView from "./type-definition/todo-dev-complexity-view";
import TodoAssignToDialog, {TodoAssignToDialogDefinition} from "./manipulation/dialog/todo-assign-to-dialog";
import TodoManOperationView from "./type-definition/todo-man-operation-view";
import TodoQaScenarioView from "./type-definition/todo-qa-scenario-view";
import TodoTaskTypeView from "./type-definition/todo-task-type-view";
import TodoMeetingTypeView from "./type-definition/todo-meeting-type-view";
import TodoRemainderTypeView from "./type-definition/todo-remainder-type-view";
import TodoPlanTypeView from "./type-definition/todo-plan-type-view";
import TodoNoteTypeView from "./type-definition/todo-note-type-view";
import TodoOtherTypeView from "./type-definition/todo-other-type-view";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {TaskStatusColor} from "../../app/task-status-color";



export const TodoOtherUrls = [
    {
        path: "/todo/dev-complexity/:id",
        name: "Dev Complexity",
        component: TodoDevComplexityView,
        isActive: true,
    },
    {
        path: "/todo/qa-complexity/:id",
        name: "QA Complexity",
        component: TodoQaScenarioView,
        isActive: true,
    },
    {
        path: "/todo/man-operation/:id",
        name: "Management Operation",
        component: TodoManOperationView,
        isActive: true,
    },
    {
        path: "/todo/task-type/:id",
        name: "Task Action",
        component: TodoTaskTypeView,
        isActive: true,
    },
    {
        path: "/todo/meeting-type/:id",
        name: "Meeting Type",
        component: TodoMeetingTypeView,
        isActive: true,
    },
    {
        path: "/todo/remainder-type/:id",
        name: "Remainder Type",
        component: TodoRemainderTypeView,
        isActive: true,
    },
    {
        path: "/todo/plan-type/:id",
        name: "Plan Type",
        component: TodoPlanTypeView,
        isActive: true,
    },
    {
        path: "/todo/note-type/:id",
        name: "Note Type",
        component: TodoNoteTypeView,
        isActive: true,
    },
    {
        path: "/todo/other-type/:id",
        name: "Other Type",
        component: TodoOtherTypeView,
        isActive: true,
    },
];


const tableHeaderDefinition = [
    RaTableHeaderDefinition.instance('name', 'Name'),
    RaTableHeaderDefinition.instance('deadline', 'Deadline', false),
    RaTableHeaderDefinition.instance('priority', 'Priority'),
    RaTableHeaderDefinition.instance('depth', 'Depth', false),
    RaTableHeaderDefinition.instance('due', 'Due', false),
    RaTableHeaderDefinition.instance('estimation', 'Estimation', false),
    RaTableHeaderDefinition.instance('todoType', 'Type'),
    RaTableHeaderDefinition.instance('creator', 'Creator', false),
];

class TodoMainView extends RaViewComponent {

    issueFilterBy = "ALL_TODO";
    statusSelectValue = "SELECT";

    constructor(props) {
        super(props);
        this.state = {
            editPopup: false,
            todoAssignDefinition: TodoAssignToDialogDefinition.instance(),
            taskWarriorPopup: false,
            orderBy: "id",
            search: "",
            order: "desc",
            todoList: [],
            formData: {},
            todoDetails: {},
            formError: {},
            total: 0,
            max: AppConstant.rowsPerPage,
            offset: AppConstant.defaultOffset,
            priority: {},
            todoType: {},
            issueFilterByOptions: {},
            issueFilterBy: this.issueFilterBy,
            statusOptions: {},
            statusSelectValue: this.statusSelectValue,
        };
    }


    componentDidMount() {
        this.initiateForm();
    }


    initiateForm() {
        this.setState((state) => {
            let formData = {
                priority: "NA",
                todoType: "NOTE",
                dueDate: RaUtil.dateInputDateFormat(),
            };
            return {formData: formData};
        });
        this.showFlashMessage();
        this.loadDropDownValues();
        this.loadList();
    }

    loadDropDownValues(){
        this.getToApi(ApiURL.CommonDropDownConstant,  response => {
            let data = response.data.response;
            if (data.priority){
                this.setState({priority: data.priority})
            }

            if (data.todoType){
                this.setState({todoType: data.todoType})
            }

            if (data.status){
                this.setState({statusOptions: data.status})
            }
        });

        this.getToApi(ApiURL.CommonTodoFilterDropDownContent,  response => {
            let data = response.data.response;
            if (data.issueFilterBy){
                this.setState({issueFilterByOptions: data.issueFilterBy})
            }
        });
    }

    loadList(condition = {}) {
        condition = this.loadOffsetMax(condition);
        condition.issueFilterBy = this.issueFilterBy;
        if (this.statusSelectValue !== "SELECT"){
            condition = RaGsConditionMaker.equal(condition, "status", this.statusSelectValue);
        }
        this.postJsonToApi(ApiURL.TodoList, condition, response => {
            this.setState({todoList: response.data.response});
            this.setState({total: response.data.total ? response.data.total : 0});
        });
    }


    loadListWithCallback(callBack) {
        this.loadList();
        if (callBack) {
            callBack();
        }
    }



    formSubmitHandler = event => {
        event.preventDefault();
        let formData = this.state.formData;
        let url = ApiURL.TodoQuickCreate;
        this.postJsonToApi(url, formData,
            success => {
                let data = success.data;
                if (data.isSuccess){
                    this.initiateForm();
                    this.showSuccessInfo("Todo Created!!");
                }else{
                    this.showErrorInfo(data.message);
                    this.responseErrorProcessor(data);
                }


            }
        )
    };

    clickOnSort = (name, row, event) => {
        let condition = this.sortProcessor(name);
        this.loadList(condition);
    };


    deleteAction = (event, actionDefinition) =>{
        let additionalInformation = actionDefinition.additionalInformation;
        let component = actionDefinition.component;
        if (additionalInformation.id) {
            let formData = RaGsConditionMaker.equal({}, "id", additionalInformation.id);
            component.deleteJsonToApi(ApiURL.UserDelete, formData,
                success => {
                    component.processFormResponse(success.data, "/user");
                    component.loadList();
                    component.showSuccessInfo("Successfully Deleted")
                }
            )
        }
    };

    editAction (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.setState({todoDetails: additionalInformation});
        actionDefinition.component.setState({editPopup: true});
    };

    issueFilterByOnChange(event) {
        this.issueFilterBy = event.target.value
        this.setState({issueFilterBy: this.issueFilterBy});
        this.loadList();
    };

    issueStatusFilterOnChange(event) {
        this.statusSelectValue = event.target.value;
        this.setState({statusSelectValue: this.statusSelectValue});
        this.loadList();
    };

    allActions (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.goToUrl(actionDefinition.url + additionalInformation.id)
    };

    taskWarrior (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.setState({todoDetails: additionalInformation});
        actionDefinition.component.setState({taskWarriorPopup: true});
    };

    generalWarrior (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.setState({todoDetails: additionalInformation});
        actionDefinition.component.setState({taskWarriorPopup: true});
        actionDefinition.component.setState({todoAssignDefinition: TodoAssignToDialogDefinition.instance().setComplexityType("OTHERS")});
    };

    publishOrUnpublish (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.getToApi(actionDefinition.url + "?todoId=" + additionalInformation.id,  response => {
            let data = response.data;
            if (data.isSuccess) {
                actionDefinition.component.showSuccessInfo(data.message);
                actionDefinition.component.loadList();
            } else {
                actionDefinition.component.showErrorInfo(data.message);
            }
        });
    };

    searchSubmitHandler = event => {
        event.preventDefault();
        let condition = RaGsConditionMaker.like({}, "name", this.state.search);
        this.loadList(condition);
    };

    resetSearch = event => {
        event.preventDefault();
        this.setState({search: ""});
        this.loadList({});
    };


    searchInputValueChange(event) {
        this.setState({search: event.target.value});
    }

    appRender() {
        const {classes} = this.props;

        let tableActions = info =>{
            let allActions = {};


            switch (info.todoType) {
                case "TEAM_TASK":
                    allActions.manOperation = ActionDefinition.instance("Man Operation", this.allActions, HorizontalSplitIcon).setComponent(this).addAdditionalInfo(info).setUrl("/todo/man-operation/");
                    allActions.devComplexity = ActionDefinition.instance("Dev Complexity", this.allActions, TrendingUpIcon).setComponent(this).addAdditionalInfo(info).setUrl("/todo/dev-complexity/");
                    allActions.qaComplexity = ActionDefinition.instance("QA Scenario", this.allActions, TrendingDownIcon).setComponent(this).addAdditionalInfo(info).setUrl("/todo/qa-complexity/");
                    allActions.taskWarrior = ActionDefinition.instance("Task Warrior", this.taskWarrior, DeviceHubIcon).setComponent(this).addAdditionalInfo(info);
                    break;
                case "NOTE":
                    break;
                case "TASK":
                    allActions.taskAction = ActionDefinition.instance("Task Actions", this.allActions, LineStyleIcon).setComponent(this).addAdditionalInfo(info).setUrl("/todo/task-type/");
                    break;
                case "MEETING":
                    allActions.meetingTopic = ActionDefinition.instance("Topics", this.allActions, SpeakerNotesIcon).setComponent(this).addAdditionalInfo(info).setUrl("/todo/meeting-type/");
                    break;
                case "REMAINDER":
                    allActions.remainderNote = ActionDefinition.instance("Remainder Note", this.allActions, ScheduleIcon).setComponent(this).addAdditionalInfo(info).setUrl("/todo/remainder-type/");
                    break;
                case "PLAN":
                    allActions.planNote = ActionDefinition.instance("Plan Note", this.allActions, BlurLinearIcon).setComponent(this).addAdditionalInfo(info).setUrl("/todo/plan-type/");
                    break;
                case "OTHERS":
                    allActions.otherNote = ActionDefinition.instance("Other Note", this.allActions, ModeCommentIcon).setComponent(this).addAdditionalInfo(info).setUrl("/todo/other-type/");
                    break;
            }



            if (info.publishInfo.isShow){
                if (info.publishInfo.isPublished) {
                    allActions.unpublish = ActionDefinition.instance("Unpublish", this.publishOrUnpublish, UnpublishIcon).setComponent(this).addAdditionalInfo(info).setUrl(ApiURL.TodoUnpublish);
                }else{
                    allActions.publish = ActionDefinition.instance("Publish", this.publishOrUnpublish, PublishIcon).setComponent(this).addAdditionalInfo(info).setUrl(ApiURL.TodoPublish);
                }
            }

            if (allActions.taskWarrior === undefined){
                allActions.taskWarrior = ActionDefinition.instance("Assign To", this.generalWarrior, AssignmentIcon).setComponent(this).addAdditionalInfo(info);
            }


            let actions = ActionDefinition.commonActions(info, this);
            actions.editAction.action = this.editAction;
            actions.editAction.label = "Edit Todo";
            allActions.editAction = actions.editAction;


            actions.deleteAction.action = this.deleteAction;
            actions.deleteAction.label = "Delete Todo";
            allActions.deleteAction = actions.deleteAction;
            return allActions;
        };

        let thisComponent = this;

        return (<React.Fragment>
            {this.state.editPopup ? (<TodoEditDialog parent={this} todoObject={this.state.todoDetails}/>): ""}
            {this.state.taskWarriorPopup ? (<TodoAssignToDialog parent={this} todoObject={this.state.todoDetails} definition={this.state.todoAssignDefinition}/>): ""}
            <Paper className={classes.mainActionArea}>
                <div>
                    <Typography variant="headline">Todo List</Typography>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <form onSubmit={this.searchSubmitHandler}>
                                <Grid container spacing={8}>
                                    <Grid item xs={11}>
                                        <TextField placeholder="Search" name="search" value={this.state.search} fullWidth onChange={event => {this.searchInputValueChange(event)}}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton children={<ClearIcon/>} onClick={this.resetSearch}/>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Todo Filter" onChange={event => {this.issueFilterByOnChange(event)}} value={this.state.issueFilterBy} placeholder="Issue Filter" select fullWidth>
                                {
                                    Object.entries(this.state.issueFilterByOptions).map(([objectKey, objectValue], key) => {
                                        return (<MenuItem key={key} value={objectKey}>{objectValue}</MenuItem>)
                                    })
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Status" onChange={event => {this.issueStatusFilterOnChange(event)}} value={this.state.statusSelectValue} placeholder="Status" select fullWidth>
                                <MenuItem value="SELECT">Select Status</MenuItem>
                                {
                                    Object.entries(this.state.statusOptions).map(([objectKey, objectValue], key) => {
                                        return (<MenuItem key={key} value={objectKey}>{TaskStatusColor.statusOnText(objectValue, objectKey)}</MenuItem>)
                                    })
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <form onSubmit={this.formSubmitHandler} >
                    <Typography variant="headline">Create Todo</Typography>
                    <Grid container spacing={8}>
                        <Grid item xs={12}><TextField label="Name" {...this.onChangeTextFieldProcessor("name")} placeholder="Name" fullWidth/></Grid>
                        <Grid item xs={4}><TextField label="Due Date" {...this.onChangeTextFieldProcessor("dueDate")} placeholder="Due Date" type="date" fullWidth/></Grid>
                        <Grid item xs={3}>
                            <TextField label="Priority" {...this.onChangeSelectProcessor("priority")} placeholder="Priority" select fullWidth>
                                {
                                    Object.entries(this.state.priority).map(([objectKey, objectValue], key) => {
                                       return (<MenuItem key={key} value={objectKey}>{objectValue}</MenuItem>)
                                    })
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Type" {...this.onChangeSelectProcessor("todoType")} placeholder="Type" select fullWidth>
                                {
                                    Object.entries(this.state.todoType).map(([objectKey, objectValue], key) => {
                                        return (<MenuItem key={key} value={objectKey}>{objectValue}</MenuItem>)
                                    })
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={2}><Button variant="contained" type="submit" color="primary" fullWidth>Add</Button></Grid>
                    </Grid>
                    </form>
                </div>
            </Paper>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <RaTableHeader
                            clickForSort={this.clickOnSort}
                            rows={tableHeaderDefinition}
                            order={this.state.order}
                            orderBy={this.state.orderBy}/>
                        <TableBody>
                            {this.state.todoList.map(function (todo, key) {
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{TaskStatusColor.statusOnText(todo.name, todo.status)}</TableCell>
                                        <TableCell>{todo.dueDate}</TableCell>
                                        <TableCell>{thisComponent.state.priority[todo.priority]}</TableCell>
                                        <TableCell>{todo.depth}</TableCell>
                                        <TableCell>{todo.due}</TableCell>
                                        <TableCell>{todo.estimation}</TableCell>
                                        <TableCell>{thisComponent.state.todoType[todo.todoType]}</TableCell>
                                        <TableCell>{RaUtil.concatStringWithSpace(todo.createdBy.firstName, todo.createdBy.lastName)}</TableCell>
                                        <TableCell numeric><RaTableAction tableActions={tableActions(todo)}/></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                <RaPagination {...this.paginationProcessor()}/>
            </Paper>
        </React.Fragment>);
    }
}
export default withStyles(viewCommon)(TodoMainView);