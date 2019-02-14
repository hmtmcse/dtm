import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {
    Button, Grid
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {ApiURL} from "../../../../app/api-url";
import {RaUtil} from "../../../../artifacts/ra-util";
import RaSelect from "../../../../artifacts/ra-select";

const defaultSelectData = {value: "SELECT", label: "Not Assigned"};

export default class AddWorkLogDialog extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            formTitle: "Add New ",
            formButton: "Save",
            markDownDisplayField: "description",
            formData: {},
            formError: {},
            users: {},
            assigneeSelect: [],
        };
    }

    componentDidMount() {
        this.showFlashMessage();
        this.setState((state) => {
            let formData = {
                management: "SELECT",
                development: "SELECT",
                qa: "SELECT",
                assignee: "SELECT",
            };
            return {formData: formData};
        });
        this.loadDropDownValues();
        this.loadAssigneeData();
    }

    loadDropDownValues() {
        this.getToApi(ApiURL.CommonAllUserDropDownContent, response => {
            let data = response.data.response;
            if (data) {
                this.setState({users: data});
                let select = [];
                select.push(defaultSelectData);
                Object.entries(data).map(([objectKey, user], key) => {
                    select.push({label: RaUtil.concatStringWithSpace(user.firstName, user.lastName), value: user.id});
                });
                this.setState({assigneeSelect: select});
            }
        });
    }

    closePopup = () => {
        const {parent} = this.props;
        parent.setState({taskWarriorPopup: false});
    };


    loadAssigneeData() {
        const {todoObject, parent} = this.props;
        let condition = {todoId: todoObject.id};
        this.postJsonToApi(ApiURL.AssigneeListByTodoId, condition, response => {
            let data = response.data;
            if (data.isSuccess) {
                let formData = this.state.formData;
                Object.entries(response.data.response).map(([objectKey, assignee], key) => {
                    switch (assignee.taskType) {
                        case "QA":
                            formData.qa = (assignee.assigneeId ? assignee.assigneeId : "SELECT");
                            formData.qaId = assignee.id;
                            break;
                        case "MANAGEMENT":
                            formData.management = (assignee.assigneeId ? assignee.assigneeId : "SELECT");
                            formData.managementId = assignee.id;
                            break;
                        case "DEVELOPMENT":
                            formData.development = (assignee.assigneeId ? assignee.assigneeId : "SELECT");
                            formData.developmentId = assignee.id;
                            break;
                        case "OTHERS":
                            formData.assignee = (assignee.assigneeId ? assignee.assigneeId : "SELECT");
                            formData.assigneeId = assignee.id;
                            break;
                    }
                });
                this.setState({formData: formData});
            } else {
                parent.showErrorInfo(data.message);
                this.closePopup();
            }
        }, failed => {
            parent.showErrorInfo("Unable to Open Form.");
            this.closePopup();
        });
    }


    formSubmitHandler = event => {
        event.preventDefault();
        const {parent, todoObject} = this.props;
        let formData = this.state.formData;
        let postList = [];
        let qaData = {"todoId": todoObject.id, "taskType": "QA"};
        if (formData.qa !== "SELECT" && formData.qa) {
            qaData.assignToId = formData.qa;
            if (formData.qaId) {
                qaData.id = formData.qaId
            }
            postList.push(qaData);
        } else {
            if (formData.qaId) {
                qaData.id = formData.qaId;
                qaData.assignToId = 0;
                postList.push(qaData);
            }
        }


        let managementData = {"todoId": todoObject.id, "taskType": "MANAGEMENT"};
        if (formData.management !== "SELECT" && formData.management) {
            managementData.assignToId = formData.management;
            if (formData.managementId) {
                managementData.id = formData.managementId
            }
            postList.push(managementData);
        } else {
            if (formData.managementId) {
                managementData.id = formData.managementId;
                managementData.assignToId = 0;
                postList.push(managementData);
            }
        }


        let developmentData = {"todoId": todoObject.id, "taskType": "DEVELOPMENT"};
        if (formData.development !== "SELECT" && formData.development) {
            developmentData.assignToId = formData.development;
            if (formData.developmentId) {
                developmentData.id = formData.developmentId
            }
            postList.push(developmentData);
        } else {
            if (formData.developmentId) {
                developmentData.id = formData.developmentId;
                developmentData.assignToId = 0;
                postList.push(developmentData);
            }
        }

        let assigneeData = {"todoId": todoObject.id, "taskType": "OTHERS"};
        if (formData.assignee !== "SELECT" && formData.assignee) {
            assigneeData.assignToId = formData.assignee;
            if (formData.assigneeId) {
                assigneeData.id = formData.assigneeId
            }
            postList.push(assigneeData);
        } else {
            if (formData.assigneeId) {
                assigneeData.id = formData.assigneeId;
                assigneeData.assigneeId = 0;
                postList.push(assigneeData);
            }
        }

        this.postJsonToApi(ApiURL.AssigneeBulkAssign, {assignTo: postList}, success => {
                let data = success.data;
                if (data.isSuccess) {
                    this.closePopup();
                    parent.showSuccessInfo(data.message);
                } else {
                    this.showErrorInfo(data.message);
                }
            }
        )
    };

    appRender() {
        const {definition} = this.props;
        let dropDown = "";
        if (definition.complexityType === "TEAM_TASK") {
            dropDown = (
                <React.Fragment>
                    <Grid item xs={12}>
                        <RaSelect {...this.onChangeRaSelectProcessor("management", this.state.assigneeSelect,  defaultSelectData)} label="Management"/>
                    </Grid>
                    <Grid item xs={12}>
                        <RaSelect {...this.onChangeRaSelectProcessor("development", this.state.assigneeSelect,  defaultSelectData)} label="Development"/>
                    </Grid>
                    <Grid item xs={12}>
                        <RaSelect {...this.onChangeRaSelectProcessor("qa", this.state.assigneeSelect,  defaultSelectData)} label="Quality Assurance"/>
                    </Grid>
                </React.Fragment>);
        }else if (definition.complexityType === "OTHERS"){
            dropDown = (
                <React.Fragment>
                    <Grid item xs={12}>
                        <RaSelect {...this.onChangeRaSelectProcessor("assignee", this.state.assigneeSelect,  defaultSelectData)} label="Assignee"/>
                    </Grid>
                </React.Fragment>);
        }
        return (
            <Dialog open={true} fullWidth>
                <DialogTitle>Assign Warrior</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.formSubmitHandler}>
                        <Grid container spacing={8}>
                            {dropDown}
                        </Grid>
                        <DialogActions>
                            <Button type="submit" color="primary" variant="raised">Assign</Button>
                            <Button onClick={this.closePopup} color="primary" variant="raised">Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}

AddWorkLogDialog.propTypes = {
    editId: PropTypes.number,
    logType: PropTypes.string.isRequired,
    searchUuid: PropTypes.string.isRequired,
    searchId: PropTypes.number.isRequired,
};