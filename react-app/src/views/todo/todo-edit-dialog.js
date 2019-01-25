import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import RaViewComponent from "../../artifacts/ra-view-component";
import {
    Button, TextField, Grid
} from '@material-ui/core'
import React from 'react';
import {ApiURL} from "../../app/api-url";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import RaMarkdown from "../../artifacts/ra-markdown";
import {RaGsConditionMaker} from "../../artifacts/ra-gs-condition-maker";
import {TaskStatusColor} from "../../app/task-status-color";

export default class TodoEditDialog extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            open: true,
            formData: {},
            markDownDisplayField: "description",
            formError: {},
            priority: {},
            status: {},
            todoType: {}
        };
    }

    componentDidMount() {
        this.showFlashMessage();
        this.loadDropDownValues();
        const { parent, todoObject } = this.props;
        let id = todoObject.id;
        if (id) {
            this.showFlashMessage();
            this.getToApi(ApiURL.TodoDetails + "?propertyName=id&propertyValue=" + id, response => {
                this.setState({formData: response.data.response});
            });
        }else {
            parent.showErrorInfo("Invalid Todo Entity.");
            parent.setState({editPopup: false});
        }
    }


    closePopup = () => {
        const { parent } = this.props;
        parent.setState({editPopup: false});
    };

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
                this.setState({status: data.status})
            }
        });
    }

    selectMarkdownViewer (event, name){
        this.setState({markDownDisplayField: name});
    }

    formSubmitHandler = event => {
        event.preventDefault();
        console.log("XYZ");
        const { parent, todoObject } = this.props;
        let formData = this.state.formData;
        formData = RaGsConditionMaker.equal(formData, "id", Number(todoObject.id));
        this.postJsonToApi(ApiURL.TodoUpdate, formData, success => {
                let data = success.data;
                if (data.isSuccess){
                    parent.loadListWithCallback(
                        ()=>{
                            this.closePopup();
                            parent.showSuccessInfo("Successfully Updated!!");
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
        return (
                <Dialog maxWidth="md"
                    open={this.state.open}>
                    <form onSubmit={this.formSubmitHandler}>
                    <DialogTitle id="alert-dialog-title">Edit Todo</DialogTitle>
                    <DialogContent>
                            <Grid container spacing={8}>
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
                                    <TextField label="Todo Type" {...this.onChangeSelectProcessor("todoType")} placeholder="Type" select fullWidth>
                                        {
                                            Object.entries(this.state.todoType).map(([objectKey, objectValue], key) => {
                                                return (<MenuItem key={key} value={objectKey}>{objectValue}</MenuItem>)
                                            })
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField label="Status" {...this.onChangeSelectProcessor("status")} placeholder="Status" select fullWidth>
                                        {
                                            Object.entries(this.state.status).map(([objectKey, objectValue], key) => {
                                                return (<MenuItem key={key} value={objectKey}>{TaskStatusColor.statusOnText(objectValue, objectKey)}</MenuItem>)
                                            })
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={3}><TextField label="Due Date" {...this.onChangeTextFieldProcessor("dueDate")} placeholder="Due Date" type="date" fullWidth/></Grid>

                                <Grid item xs={12}><TextField label="Name" {...this.onChangeTextFieldProcessor("name")} fullWidth/></Grid>
                                <Grid item xs={12}><TextField multiline rows={8} label="Description (Markdown)" {...this.onChangeTextFieldProcessor("description")} onFocus={event =>{this.selectMarkdownViewer(event, "description")}} fullWidth/></Grid>
                                <Grid item xs={12}><TextField multiline rows={8} label="Reference (Markdown)" {...this.onChangeTextFieldProcessor("reference")} onFocus={event =>{this.selectMarkdownViewer(event, "reference")}} fullWidth/></Grid>

                                <Grid item xs={12}>
                                    <RaMarkdown content={this.getFormDataValue(this.state.markDownDisplayField)}/>
                                </Grid>

                            </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" type="submit" variant="raised">Update</Button>
                        <Button onClick={this.closePopup} color="primary" autoFocus variant="raised">Cancel</Button>
                    </DialogActions>
                    </form>
                </Dialog>
        );
    }
}


TodoEditDialog.propTypes = {
    parent: PropTypes.object.isRequired,
    todoObject: PropTypes.object.isRequired
};

TodoEditDialog.defaultProps = {
    title: "Confirm",
    okayLabel: "Confirm",
    cancelLabel: "Cancel",
};