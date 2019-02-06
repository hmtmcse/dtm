import React from 'react'
import RaViewComponent from "./../../artifacts/ra-view-component";
import {
    TableRow, TableCell, TableBody, Paper, Table, Typography,Button,TextField
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import RaTableHeader, {RaTableHeaderDefinition} from './../../artifacts/ra-table-header';
import RaPagination from './../../artifacts/ra-pagination';
import UserCreateUpdateView from './user-create-update-view';
import RaTableAction, {ActionDefinition} from "../../artifacts/ra-table-action";
import {RaGsConditionMaker} from "../../artifacts/ra-gs-condition-maker";
import {ApiURL} from "../../app/api-url";
import {AppConstant} from "../../app/app-constant";
import {viewCommon} from "../../assets/jss/style-jss";


export const WingOtherUrls = [
    {
        path: "/user/create-update",
        name: "Create Update",
        component: UserCreateUpdateView,
        isActive: true,
    },
    {
        path: "/user/create-update/:id",
        name: "Create Update",
        component: UserCreateUpdateView,
        isActive: true,
    }
];


const tableHeaderDefinition = [
    RaTableHeaderDefinition.instance('firstName', 'Name'),
    RaTableHeaderDefinition.instance('email', 'Email'),
];

class WingMainView extends RaViewComponent {

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
        actionDefinition.component.goToUrl("/user/create-update/" + additionalInformation.id)
    };

    appRender() {
        const {classes} = this.props;

        let tableActions = info =>{
            let actions = ActionDefinition.commonActions(info, this);
            actions.editAction.action = this.editAction;
            delete (actions.viewAction);
            actions.deleteAction.action = this.deleteAction;
            return actions;
        };

        return (<React.Fragment>
            <Paper className={classes.mainActionArea}>
                <div>
                    <Typography variant="headline">Users</Typography>
                </div>
                <div>
                    <form className={classes.displayInline}>
                        <TextField placeholder="search" name="search"/>
                    </form>
                    <Button className={classes.marginToLeft} onClick={event =>{this.goToUrl("/user/create-update", event)}} variant="contained" color="primary">Create</Button>
                    <Button className={classes.marginToLeft} onClick={this.reload} variant="contained" color="primary">Reload</Button>
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
                            {this.state.users.map(function (user, key) {
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell numeric><RaTableAction tableActions={tableActions(user)}/></TableCell>
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
export default withStyles(viewCommon)(WingMainView);