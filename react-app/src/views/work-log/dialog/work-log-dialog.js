import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {
    Button, TextField, Grid, MenuItem
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../artifacts/ra-view-component";
import {RaGsConditionMaker} from "../../../artifacts/ra-gs-condition-maker";
import {ApiURL} from "../../../app/api-url";
import RaMarkdown from "../../../artifacts/ra-markdown";
import {CommonService} from "../../../app/common-service";

export default class WorkLogDialog extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            open: true,
            formTitle: "Add Work Log",
            formButton: "Save",
            formData: {},
            formError: {},
            teamLead: [],
            members: [],
        };
    }

    componentDidMount() {
        this.showFlashMessage();
        this.loadDropDownValues();
        this.loadEditData();
    }

    loadDropDownValues(){
        this.getToApi(ApiURL.CommonAllUserDropDownContent, response => {
            let data = response.data.response;
            if (data) {
                let selectData = CommonService.userSelectData(data);
                this.setState({teamLead: selectData});
                this.setState({members: selectData});
            }
        });
    }


    closePopup = () => {
        const { parent } = this.props;
        parent.setState({isOpenWorkLogDialog: false});
    };


    loadEditData() {
        const { editId, parent } = this.props;
        if (editId !== undefined) {
            this.setState(state => ({
                formTitle: "Update Work Log",
                formButton: "Update",
            }));
            let condition = RaGsConditionMaker.equal({}, "id", editId);
            this.postJsonToApi(ApiURL.WingDetails, condition, response => {
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
        const { parent, editId, definition, logType } = this.props;
        let formData = this.state.formData;
        let url = ApiURL.WorkLogCreate;
        let successMessage = "Successfully Created.";
        if (editId !== undefined){
            url = ApiURL.WorkLogUpdate;
            successMessage = "Successfully Updated.";
            formData = RaGsConditionMaker.equal(formData, "id", Number(editId))
        }else{
            formData.logType = logType;
            formData.searchId = definition.searchId;
            formData.searchUuid = definition.searchUuid;
        }

        this.postJsonToApi(url, formData, success => {
                let data = success.data;
                if (data.isSuccess){
                    this.closePopup();
                    parent.showSuccessInfo(successMessage);
                    if (parent.loadAfterWorkLog){
                        parent.loadAfterWorkLog(success);
                    }
                }else{
                    this.showErrorInfo(response.message);
                    this.responseErrorProcessor(data);
                }
            }
        )
    };


    appRender() {
        return (
            <Dialog open={this.state.open} maxWidth="md" fullWidth>
                <DialogTitle>{this.state.formTitle}</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.formSubmitHandler}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}><TextField type="number" label="Worked Hour" {...this.onChangeTextFieldProcessor("workedHour")} fullWidth/></Grid>
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


WorkLogDialog.propTypes = {
    parent: PropTypes.object.isRequired,
    definition: PropTypes.object.isRequired,
    logType: PropTypes.string.isRequired
};


export class WorkLogDialogDefinition {

    searchUuid = "";
    searchId = 0;
    estimatedHour = 0;
    remainingHour = 0;
    editId = 0;

    setSearchUuid(searchUuid){
        this.searchUuid = searchUuid;
        return this;
    }

    setSearchId(searchId){
        this.searchId = searchId;
        return this;
    }

    setEstimatedHour(estimatedHour){
        this.estimatedHour = estimatedHour;
        return this;
    }


    setRemainingHour(remainingHour){
        this.remainingHour = remainingHour;
        return this;
    }


    setEditId(editId){
        this.editId = editId;
        return this;
    }
}
