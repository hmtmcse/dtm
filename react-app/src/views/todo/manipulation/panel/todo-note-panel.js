import PropTypes from "prop-types";
import {
    Button, Card, CardActions, Typography, CardContent
} from '@material-ui/core'
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RaExpandableCard from "../../../../artifacts/ra-expandable-card";
import {ActionDefinition} from "../../../../artifacts/ra-table-action";
import RaViewComponent from "../../../../artifacts/ra-view-component";
import {ApiURL} from "../../../../app/api-url";
import {withStyles} from '@material-ui/core/styles';
import {viewCommon} from "../../../../assets/jss/style-jss";
import {RaGsConditionMaker} from "../../../../artifacts/ra-gs-condition-maker";
import RaMarkdown from "../../../../artifacts/ra-markdown";
import TodoNoteDialog from "../dialog/todo-note-dialog";




class TodoNotePanel extends RaViewComponent {


    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            formError: {},
            note: [],
            allDetails: {},
            isOpenTodoNote: false,
            editId: undefined,
        };
    }


    componentDidUpdate(prevProps) {
        if (this.props.allDetails !== prevProps.allDetails) {
            this.setState({allDetails: this.props.allDetails});
            if (Object.getOwnPropertyNames(this.props.allDetails.note).length) {
                this.setState({note: this.props.allDetails.note});
            }
        }
    }

    loadNote(callBack) {
        this.getToApi(ApiURL.NoteGetDetailsByTodo + "?todoId=" + this.state.allDetails.id, response => {
            let responseData = response.data.response;
            if (responseData){
                this.setState({note: responseData});
            }
            if (callBack){
                callBack();
            }
        });
    }

    openTodoNote(event, editId = undefined){
        this.setState(state => ({
            isOpenTodoNote: true,
            editId: editId,
        }));
    }

    deleteAction = (event, actionDefinition) =>{
        let additionalInformation = actionDefinition.additionalInformation;
        let component = actionDefinition.component;
        if (additionalInformation.id) {
            let formData = RaGsConditionMaker.equal({}, "id", additionalInformation.id);
            component.deleteJsonToApi(ApiURL.NoteDelete, formData,
                success => {
                    component.loadNote();
                    component.showSuccessInfo("Successfully Deleted")
                },
                failed =>{
                    component.showSuccessInfo("Unable to Delete Data")
                }
            )
        }
    };

    editAction (event, actionDefinition){
        let additionalInformation = actionDefinition.additionalInformation;
        actionDefinition.component.openTodoNote(event, additionalInformation.id);
    };

    

    appRender() {
        let noteActions = info => {
            let actions = ActionDefinition.commonActions(info, this);
            actions.editAction.action = this.editAction;
            delete (actions.viewAction);
            actions.deleteAction.action = this.deleteAction;
            return actions;
        };
        const {classes, uiDefinition} = this.props;
        return (
            <React.Fragment>
                {this.state.isOpenTodoNote ? (<TodoNoteDialog parent={this} editId={this.state.editId} uiDefinition={uiDefinition}/>): ""}
                <Card>
                    <CardActions className={classes.mainActionArea}>
                        <div>
                            <Typography variant="headline" >{uiDefinition.notePanelTitle}</Typography>
                        </div>
                        <div>
                            <Button onClick={(e) => {this.openTodoNote(e)}}><AddIcon/></Button>
                        </div>
                    </CardActions>
                    <CardContent>
                        {this.state.note.map(function (noteItem, key) {
                            return (
                                <RaExpandableCard key={key}  actions={noteActions(noteItem)} title={noteItem.name} children={<RaMarkdown content={noteItem.description}/>}/>
                            )
                        })}
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(viewCommon)(TodoNotePanel);

TodoNotePanel.propTypes = {
    allDetails: PropTypes.object.isRequired,
    uiDefinition: PropTypes.object.isRequired,
};


