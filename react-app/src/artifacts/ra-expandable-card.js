import React, {Component} from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import ErrorIcon from '@material-ui/icons/Error';
import _ from 'lodash';
import RaAlertDialog from "./ra-alert-dialog";
import {withStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Card, CardActions, Typography, Collapse, CardContent
} from '@material-ui/core'


const styles = theme => ({
    cardAction : {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px",
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    expandClose: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    spaceInBottom : {
        marginBottom: "1px"
    },
});

class RaExpandableCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            showConfirmationDialog: false,
            confirmDialogConfig: {},
        };
    }

    componentDidMount() {
        const { alwaysExpanded } = this.props;
        if (alwaysExpanded){
            this.setState({expanded: alwaysExpanded})
        }
    }

    confirmationHandler = (event, actionDefinition) => {
        if (actionDefinition.confirmation) {
            let confirmation = actionDefinition.confirmation;
            this.state.confirmDialogConfig = {
                title: confirmation.title,
                okayLabel: confirmation.okayLabel,
                cancelLabel: confirmation.cancelLabel,
                message: confirmation.message,
                okayFunction: event => {
                    if (confirmation.okayFunction) {
                        confirmation.okayFunction(event, actionDefinition);
                    } else if (actionDefinition.action) {
                        actionDefinition.action(event, actionDefinition);
                    }
                    this.setState({showConfirmationDialog: false})
                },
                cancelFunction: event => {
                    if (confirmation.cancelFunction) {
                        confirmation.cancelFunction(event, actionDefinition);
                    }
                    this.setState({showConfirmationDialog: false})
                }
            };
            this.setState({showConfirmationDialog: true});
        }
    };

    handleExpandClick(event) {
        event.preventDefault();
        this.setState({expanded: !this.state.expanded})
    }

    render() {
        const { classes, title, actions, children, titleVariant, cardTop, cardMiddleChildren } = this.props;
        let showHideButton = (this.state.expanded ? classes.expandOpen : classes.expandClose);
        return (
            <React.Fragment>
                <Card>
                    {cardTop}
                    <CardActions className={classes.cardAction}>
                        <div>
                            <Typography variant={titleVariant} align="center">{title}</Typography>
                        </div>
                        <div>{cardMiddleChildren}</div>
                        <div>
                            {
                                _.map(actions, (actionDefinition, key) => {
                                    return (
                                        <IconButton title={actionDefinition.label}
                                            key={key} onClick={ event => {
                                            if (actionDefinition.confirmation) {
                                                this.confirmationHandler(event, actionDefinition)
                                            } else if (actionDefinition.action) {
                                                actionDefinition.action(event, actionDefinition)
                                            }
                                        }}>
                                            {actionDefinition.icon ? (<actionDefinition.icon/>) : (<ErrorIcon/>)}
                                        </IconButton>
                                    )
                                })
                            }
                            <IconButton title="Show/Hide Details"
                                className={showHideButton}
                                onClick={event => { this.handleExpandClick(event)}}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more">
                                <ExpandMoreIcon/>
                            </IconButton>
                        </div>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        {children}
                    </Collapse>
                </Card>
                {this.state.showConfirmationDialog ? (<RaAlertDialog isOpen={this.state.showConfirmationDialog} {...this.state.confirmDialogConfig}/>): ""}
                <div className={classes.spaceInBottom}/>
            </React.Fragment>
        );
    }
}

RaExpandableCard.propTypes = {
    actions: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    titleVariant: PropTypes.string,
    children: PropTypes.node,
    cardMiddleChildren: PropTypes.node,
    cardTop: PropTypes.node,
    alwaysExpanded: PropTypes.bool,
};

RaExpandableCard.defaultProps = {
    titleVariant: "subheading",
    cardTop: "",
    alwaysExpanded: false,
};

export default withStyles(styles)(RaExpandableCard);


export class ActionDefinition {

    label = "";
    action = undefined;
    icon = ErrorIcon;
    confirmation = undefined;
    additionalInformation = undefined;
    component = undefined;

    constructor(label, action, icon) {
        this.label = label;
        this.action = action;
        this.icon = icon;
    }

    addAdditionalInfo(info){
        this.additionalInformation = info;
        return this;
    }

    setComponent(component){
        this.component = component;
        return this;
    }

    addConfirmation(message = undefined) {
        this.confirmation = {
            title: "Confirm",
            message: message,
            okayLabel: "Confirm",
            okayFunction: null,
            cancelFunction: null,
            cancelLabel: "Cancel",
        };
        return this;
    }

    static commonActions(additionalInformation = undefined, component = undefined) {
        return {
            viewAction: ActionDefinition.instance("View", undefined, Visibility).addAdditionalInfo(additionalInformation).setComponent(component),
            editAction: ActionDefinition.instance("Edit", undefined, Edit).addAdditionalInfo(additionalInformation).setComponent(component),
            deleteAction: ActionDefinition.instance("Delete", undefined, Delete).addConfirmation("Are you sure want to Delete?").addAdditionalInfo(additionalInformation).setComponent(component),
        }
    }


    static instance(label, action, icon) {
        return new ActionDefinition(label, action, icon)
    }
}
