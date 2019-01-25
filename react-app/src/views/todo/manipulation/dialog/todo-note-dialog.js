import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {
    Button, TextField, Grid
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import {ApiURL} from "../../../../app/api-url";
import RaMarkdown from "../../../../artifacts/ra-markdown";

export default class TodoNoteDialog extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            open: true,
            formTitle: "Add New ",
            formButton: "Save",
            formData: {},
            formError: {}
        };
    }

    componentDidMount() {
        this.showFlashMessage();
        this.loadEditData();
    }


    closePopup = () => {
        const { parent } = this.props;
        parent.setState({isOpenTodoNote: false});
    };


    loadEditData() {
        const { editId, parent } = this.props;
        if (editId !== undefined) {
            this.setState(state => ({
                formTitle: "Edit ",
                formButton: "Update",
            }));
            let condition = RaGsConditionMaker.equal({}, "id", editId);
            this.postJsonToApi(ApiURL.NoteDetails, condition, response => {
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
        formData.todoId = allDetails.id;
        let url = ApiURL.NoteCreate;
        let successMessage = "Successfully Created!!";
        if (editId !== undefined){
            url = ApiURL.NoteUpdate;
            successMessage = "Successfully Updated!!";
            formData = RaGsConditionMaker.equal(formData, "id", Number(editId))
        }

        this.postJsonToApi(url, formData, success => {
                let data = success.data;
                if (data.isSuccess){
                    parent.loadNote(
                        ()=>{
                            this.closePopup();
                            parent.showSuccessInfo(successMessage);
                        }
                    );
                }else{
                    this.showErrorInfo(data.message);
                    this.responseErrorProcessor(data);
                }
            }
        )
    };


    appRender() {
        const {classes, uiDefinition} = this.props;
        return (
            <Dialog open={true}>
                <DialogTitle>{this.state.formTitle}{uiDefinition.notePanelTitle}</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.formSubmitHandler}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}><TextField label="Name" {...this.onChangeTextFieldProcessor("name")} fullWidth/></Grid>
                            <Grid item xs={12}><TextField multiline rows={10} label="Description (Markdown)" {...this.onChangeTextFieldProcessor("description")} fullWidth/></Grid>
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


TodoNoteDialog.propTypes = {
    parent: PropTypes.object.isRequired,
    editId: PropTypes.number,
    uiDefinition: PropTypes.object.isRequired,
};

