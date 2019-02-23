import React from 'react'
import RaViewComponent from "./../../artifacts/ra-view-component";
import {
    TableRow, TableCell, TableBody, Paper, Table, Typography, Button, TextField, CardContent, Grid, CardActions
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import RaTableHeader, {RaTableHeaderDefinition} from './../../artifacts/ra-table-header';
import {ApiURL} from "../../app/api-url";
import {AppConstant} from "../../app/app-constant";
import {viewCommon} from "../../assets/jss/style-jss";





const tableHeaderDefinition = [
    RaTableHeaderDefinition.instance('task', 'Task', false),
    RaTableHeaderDefinition.instance('estimation', 'Estimation', false),
    RaTableHeaderDefinition.instance('worked', 'Worked', false),
    RaTableHeaderDefinition.instance('remaining', 'Remaining', false),
    RaTableHeaderDefinition.instance('extraWork', 'Extra Work', false),
    RaTableHeaderDefinition.instance('totalWork', 'Total Work', false),
    RaTableHeaderDefinition.instance('status', 'Status', false),
];

class MyActivityReport extends RaViewComponent {

    constructor(props) {
        super(props);
        this.state = {
            orderBy: "id",
            order: "desc",
            users: [],
            total: 0,
            max: AppConstant.rowsPerPage,
            offset: AppConstant.defaultOffset,
        };
    }


    componentDidMount() {
        this.showFlashMessage();
        this.loadList();
    }

    loadList(condition = {}){
        condition = this.loadOffsetMax(condition);
        this.postJsonToApi(ApiURL.UserList, condition, response => {
            this.setState({users:response.data.response});
            this.setState({total: response.data.total ? response.data.total : 0});
        });
    }


    reload = event => {
      this.loadList();
    };


    clickOnSort = (name, row, event) => {
        let condition = this.sortProcessor(name);
        this.loadList(condition);
    };


    appRender() {
        const {classes} = this.props;

        return (<React.Fragment>
            <CardContent className={classes.root}>
                <CardActions>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>Description</Grid>
                        <Grid item xs={12}>Estimation</Grid>
                        <Grid item xs={12}>Worked</Grid>
                    </Grid>
                </CardActions>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <RaTableHeader
                            clickForSort={this.clickOnSort}
                            enableAction={false}
                            rows={tableHeaderDefinition}
                            order={this.state.order}
                            orderBy={this.state.orderBy}/>
                        <TableBody>
                            {this.state.users.map(function (user, key) {
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </React.Fragment>);
    }
}
export default withStyles(viewCommon)(MyActivityReport);