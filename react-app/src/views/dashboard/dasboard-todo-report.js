import React from 'react'
import RaViewComponent from "./../../artifacts/ra-view-component";
import {
    DateAndTimePickers, Badge,
    TableRow, TableCell, TableBody, Paper, Table, Typography, Button, TextField, Card, CardActions, CardContent,
    List, ListItem, ListItemText, Grid
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {ApiURL} from "../../app/api-url";
import {viewCommon} from "../../assets/jss/style-jss";
import {TaskStatusColor} from "../../app/task-status-color";


class DashboardTodoReport extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            assignedTodo: [],
            privateTodo: [],
            otherTodo: [],
            priority: {},
            todoType: {},
            statusOptions: {},
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
    }

    loadList(condition = {}) {
        this.postJsonToApi(ApiURL.DashboardTodoReport, condition, response => {
            let data = response.data;
            if (data.isSuccess) {
                this.setState({assignedTodo: data.response.assignedTodo});
                this.setState({privateTodo: data.response.privateTodo});
                this.setState({otherTodo: data.response.otherTodo});
            }else{
                this.showErrorInfo(data.message);
            }
        });
    }

    appRender() {
        let thisComponent = this;
        return (<React.Fragment>

            <Grid container spacing={8}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="title" >Assigned Todo</Typography>
                            <List>
                                {this.state.assignedTodo.map(function (todo, key) {
                                    return (
                                        <ListItem key={key} button>
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
                            <Typography variant="title" >My Todo</Typography>
                            <List>
                                {this.state.privateTodo.map(function (todo, key) {
                                    return (
                                        <ListItem key={key} button>
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
                            <Typography variant="title">Published Todo</Typography>
                            <List>
                                {this.state.otherTodo.map(function (todo, key) {
                                    return (
                                        <ListItem key={key} button>
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