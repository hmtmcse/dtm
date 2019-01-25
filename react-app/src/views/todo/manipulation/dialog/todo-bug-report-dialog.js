import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {
    Button, TextField, Grid, MenuItem
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import {ApiURL} from "../../../../app/api-url";
import RaMarkdown from "../../../../artifacts/ra-markdown";
import {TaskStatusColor} from "../../../../app/task-status-color";

export default class TodoBugReportDialog extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            open: true,
            formTitle: "Add New ",
            formButton: "Save",
            formData: {},
            formError: {},
            status: {},
        };
    }

    componentDidMount() {
        this.showFlashMessage();
        this.setState((state) => {
            let formData = {
                status: "DRAFT"
            };
            return {formData: formData};
        });
        this.loadDropDownValues();
        this.loadEditData();
    }
    loadDropDownValues(){
        this.getToApi(ApiURL.CommonDropDownConstant,  response => {
            let data = response.data.response;
            if (data.status){
                this.setState({status: data.status})
            }
        });
    }


    closePopup = () => {
        const { parent } = this.props;
        parent.setState({isOpenTodoBugReports: false});
    };


    loadEditData() {
        const { editId, parent } = this.props;
        if (editId !== undefined) {
            this.setState(state => ({
                formTitle: "Edit ",
                formButton: "Update",
            }));
            let condition = RaGsConditionMaker.equal({}, "id", editId);
            this.postJsonToApi(ApiURL.BugReportDetails, condition, response => {
                let data = response.data;
                if(data.isSuccess){
                    this.setState({formData: response.data.response});
                }else{
                    parent.showErrorInfo(data.message);
                    this.closePopup();
                }
            }, failed =>{
                parent.showErrorInfo("Unable to Open Edit Form.");
                this.closePopup();
            });
        }
    }

    formSubmitHandler = event => {
        event.preventDefault();
        const { parent, editId } = this.props;
        let formData = this.state.formData;
        let allDetails = parent.state.allDetails;
        formData.parentIssueId = allDetails.id;
        let url = ApiURL.BugReportCreate;
        let successMessage = "Successfully Created!!";
        if (editId !== undefined){
            url = ApiURL.BugReportUpdate;
            successMessage = "Successfully Updated!!";
            formData = RaGsConditionMaker.equal(formData, "id", Number(editId))
        }

        this.postJsonToApi(url, formData, success => {
                let data = success.data;
                if (data.isSuccess){
                    parent.loadBugReports(
                        ()=>{
                            this.closePopup();
                            parent.showSuccessInfo(successMessage);
                        }
                    );
                }else{
                    this.showErrorInfo(response.message)
                }
            }
        )
    };


    appRender() {
        const {classes, uiDefinition} = this.props;
        return (
            <Dialog open={this.state.open}>
                <DialogTitle>{this.state.formTitle}{uiDefinition.bugPanelTitle}</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.formSubmitHandler}>
                        <Grid container spacing={8}>
                            <Grid item xs={6}>
                                <TextField {...this.onChangeSelectProcessor("status")} label="Status" select fullWidth>
                                    {
                                        Object.entries(this.state.status).map(([objectKey, objectValue], key) => {
                                            return (<MenuItem key={key} value={objectKey}>{TaskStatusColor.statusOnText(objectValue, objectKey)}</MenuItem>)
                                        })
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={6}><TextField label="OtherInfo" {...this.onChangeTextFieldProcessor("otherInfo")} fullWidth/></Grid>
                            <Grid item xs={12}><TextField label="Name" {...this.onChangeTextFieldProcessor("name")} fullWidth/></Grid>
                            <Grid item xs={12}><TextField multiline rows={10} label="Description" {...this.onChangeTextFieldProcessor("description")} fullWidth/></Grid>
                            <Grid item xs={12}>
                                <RaMarkdown content={this.getFormDataValue("description")}/>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button type="submit" color="primary" variant="raised">{this.state.formButton}</Button>
                            <Button onClick={this.closePopup} color="primary" variant="raised">Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}


TodoBugReportDialog.propTypes = {
    parent: PropTypes.object.isRequired,
    editId: PropTypes.number,
    uiDefinition: PropTypes.object.isRequired,
};

