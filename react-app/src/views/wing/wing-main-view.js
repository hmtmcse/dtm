import React from 'react'
import RaViewComponent from "./../../artifacts/ra-view-component";
import {
    TableRow, TableCell, TableBody, Paper, Table, Typography, Button, TextField, Grid, Avatar, Card, CardHeader
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import RaTableHeader, {RaTableHeaderDefinition} from './../../artifacts/ra-table-header';
import RaPagination from './../../artifacts/ra-pagination';
import RaTableAction, {ActionDefinition} from "../../artifacts/ra-table-action";
import {RaGsConditionMaker} from "../../artifacts/ra-gs-condition-maker";
import {ApiURL} from "../../app/api-url";
import {AppConstant} from "../../app/app-constant";
import {viewCommon} from "../../assets/jss/style-jss";
import WingCreateUpdateDialog from "./dialog/wing-create-update-dialog";
import {RaUtil} from "../../artifacts/ra-util";
import {CommonService} from "../../app/common-service";


const tableHeaderDefinition = [
    RaTableHeaderDefinition.instance('name', 'Wing & Lead Name'),
    RaTableHeaderDefinition.instance('members', 'Wing Warriors', false),
];

class WingMainView extends RaViewComponent {

    constructor(props) {
        super(props);
        this.state = {
            orderBy: "id",
            order: "desc",
            wings: [],
            total: 0,
            editId: undefined,
            showCreateEditPopup: false,
            max: AppConstant.rowsPerPage,
            offset: AppConstant.defaultOffset,
        };
    }


    componentDidMount() {
        this.showFlashMessage();
        this.loadList();
    }

    loadList(condition = {}, callback){
        condition = this.loadOffsetMax(condition);
        this.postJsonToApi(ApiURL.WingList, condition, response => {
            this.setState({wings:response.data.response});
            this.setState({total: response.data.total ? response.data.total : 0});
            if (callback){
                callback(response);
            }
        });
    }

    loadListAfterAction(callback){
        this.loadList({}, callback);
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
            component.deleteJsonToApi(ApiURL.WingSoftDelete, formData,
                success => {
                    component.processFormResponse(success.data, "/wing");
                    component.loadList();
                    component.showSuccessInfo("Successfully Deleted")
                }
            )
        }
    };

    editAction(event, actionDefinition) {
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.setState({editId: additionalInformation.id});
        actionDefinition.component.setState({showCreateEditPopup: true});
    };

    createAction(event) {
        this.setState({editId: undefined});
        this.setState({showCreateEditPopup: true});
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
            {this.state.showCreateEditPopup ? (<WingCreateUpdateDialog parent={this} editId={this.state.editId}/>): ""}
            <Paper className={classes.mainActionArea}>
                <div>
                    <Typography variant="headline">Team Wings</Typography>
                </div>
                <div>
                    <Button className={classes.marginToLeft} onClick={event =>{this.createAction(event)}} variant="contained" color="primary">Create</Button>
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
                            {this.state.wings.map(function (wing, key) {
                                return (
                                    <TableRow key={key}>
                                        <TableCell align="center">
                                            <Typography variant="title" align="center">{wing.name}</Typography>
                                            <Typography variant="caption" align="center">{RaUtil.concatStringWithSpace(wing.wingLead.firstName, wing.wingLead.lastName)}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Grid container spacing={8} align="left">
                                                {wing.members.map(function (member, key) {
                                                    return(<Grid item xs={4} key={key}><Card><CardHeader avatar={<Avatar>{CommonService.nameToLatter(member.firstName, member.lastName)}</Avatar>} title={RaUtil.concatStringWithSpace(member.firstName, member.lastName)} subheader="Designation"/></Card></Grid>);
                                                })};
                                            </Grid>
                                        </TableCell>
                                        <TableCell numeric><RaTableAction tableActions={tableActions(wing)}/></TableCell>
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