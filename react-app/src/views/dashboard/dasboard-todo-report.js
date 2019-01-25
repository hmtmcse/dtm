import React from 'react'
import RaViewComponent from "./../../artifacts/ra-view-component";
import {
    DateAndTimePickers, Badge,
    TableRow, TableCell, TableBody, Paper, Table, Typography, Button, TextField, Card, CardActions, CardContent,
    List, ListItem, ListItemText, Grid
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {RaGsConditionMaker} from "../../artifacts/ra-gs-condition-maker";
import {ApiURL} from "../../app/api-url";
import {AppConstant} from "../../app/app-constant";
import {viewCommon} from "../../assets/jss/style-jss";
import {TaskStatusColor} from "../../app/task-status-color";


class DashboardTodoReport extends RaViewComponent {

    issueFilterBy = "ALL_ISSUES";
    statusSelectValue = "SELECT";

    constructor(props) {
        super(props);
        this.state = {
            editPopup: false,
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

    appRender() {
        let thisComponent = this;
        return (<React.Fragment>

            <Grid container spacing={8}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="title" >My Assigned Task</Typography>
                            <List>
                                {this.state.todoList.map(function (todo, key) {
                                    return (
                                        <ListItem button>
                                            <ListItemText
                                                primary={TaskStatusColor.statusOnText(todo.name, todo.status, "subheading")}
                                                secondary={
                                                    <React.Fragment>
                                                        <strong>Deadline:</strong> {todo.dueDate} <strong>Due:</strong> {todo.due} <strong>Type:</strong> {thisComponent.state.todoType[todo.todoType]}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="title" >My Task</Typography>
                            <List>
                                {this.state.todoList.map(function (todo, key) {
                                    return (
                                        <ListItem button>
                                            <ListItemText
                                                primary={TaskStatusColor.statusOnText(todo.name, todo.status, "subheading")}
                                                secondary={
                                                    <React.Fragment>
                                                        <strong>Deadline:</strong> {todo.dueDate} <strong>Due:</strong> {todo.due} <strong>Type:</strong> {thisComponent.state.todoType[todo.todoType]}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="title">Currently Processing</Typography>
                            <List>
                                {this.state.todoList.map(function (todo, key) {
                                    return (
                                        <ListItem button>
                                            <ListItemText
                                                primary={TaskStatusColor.statusOnText(todo.name, todo.status, "subheading")}
                                                secondary={
                                                    <React.Fragment>
                                                        <strong>Deadline:</strong> {todo.dueDate} <strong>Due:</strong> {todo.due} <strong>Type:</strong> {thisComponent.state.todoType[todo.todoType]}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
          </React.Fragment>);
    }
}
export default withStyles(viewCommon)(DashboardTodoReport);