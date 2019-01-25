import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {
    Button, Divider, Grid, MenuItem, withStyles
} from '@material-ui/core'
import React from 'react';
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import {ApiURL} from "../../../../app/api-url";
import RaMarkdown from "../../../../artifacts/ra-markdown";
import RaFormItemView from "../../../../artifacts/ra-form-item-view";
import {viewCommon} from "../../../../assets/jss/style-jss";

class TodoComplexityView extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            formError: {},
            status: {},
            type: {},
            taskType: {}
        };
    }

    componentDidMount() {
        this.showFlashMessage();
        this.setState((state) => {
            let formData = {
                status: "DRAFT",
                type: "OTHERS",
                taskType: "OTHERS",
            };
            return {formData: formData};
        });
        this.loadDropDownValues();
        this.loadEditData();
    }

    loadDropDownValues() {
        this.getToApi(ApiURL.CommonDropDownConstant, response => {
            let data = response.data.response;
            if (data.status) {
                this.setState({status: data.status})
            }
            if (data.complexityTaskType) {
                this.setState({taskType: data.complexityTaskType})
            }
            if (data.complexityType) {
                this.setState({type: data.complexityType})
            }
        });
    }

    closePopup = () => {
        const {parent} = this.props;
        parent.setState({isViewTodoComplexity: false});
    };


    loadEditData() {
        const {viewId, parent} = this.props;
        if (viewId !== undefined) {
            let condition = RaGsConditionMaker.equal({}, "id", viewId);
            this.postJsonToApi(ApiURL.ComplexityDetails, condition, response => {
                let data = response.data;
                if (data.isSuccess) {
                    this.setState({formData: response.data.response});
                } else {
                    parent.showErrorInfo(data.message);
                    this.closePopup();
                }
            }, failed => {
                parent.showErrorInfo("Unable to Show Details.");
                this.closePopup();
            });
        }
    }

    appRender() {
        const {classes, uiDefinition} = this.props;
        return (
            <Dialog open={true} maxWidth="md">
                <DialogTitle>View {uiDefinition.complexityPanelTitle}</DialogTitle>
                <Divider/>
                <br/>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={2}>
                            <RaFormItemView label="Status" value={this.getFormDataValue("status")}/>
                        </Grid>

                        <Grid item xs={3}>
                            <RaFormItemView label="Task Type" value={this.getFormDataValue("taskType")}/>
                        </Grid>

                        <Grid item xs={3}>
                            <RaFormItemView label="Type" value={this.getFormDataValue("type")}/>
                        </Grid>

                        <Grid item xs={2}>
                            <RaFormItemView label="Started" value={this.getFormDataValue("startedMoment")} />
                        </Grid>
                        <Grid item xs={2}>
                            <RaFormItemView label="Estimation" value={this.getFormDataValue("estimatedHour")}/>
                        </Grid>

                        <Grid item xs={12}>
                            <RaFormItemView label="Name" value={this.getFormDataValue("name")} space=""/>
                        </Grid>
                        <Grid item xs={12}>
                            <br/>
                            <br/>
                            <RaFormItemView label="Description" value={<RaMarkdown content={this.getFormDataValue("description")} enablePaper={false}/>}/>
                        </Grid>

                        <Grid item xs={12}>
                            <RaFormItemView label="Reference" value={<RaMarkdown content={this.getFormDataValue("reference")} enablePaper={false}/>}/>
                        </Grid>

                    </Grid>
                </DialogContent>
                <Divider light />
                <DialogActions>
                    <Button onClick={this.closePopup} color="primary" variant="raised">Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default withStyles(viewCommon)(TodoComplexityView);


TodoComplexityView.propTypes = {
    parent: PropTypes.object.isRequired,
    viewId: PropTypes.number.isRequired,
    uiDefinition: PropTypes.object.isRequired,
};

