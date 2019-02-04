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
    Card, CardActions, Typography, Collapse, Divider, Menu, MenuItem, MenuList
} from '@material-ui/core'
import {RaUtil} from "./ra-util";


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
        marginBottom: "15px"
    },
});

class RaExpandableCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            showConfirmationDialog: false,
            confirmDialogConfig: {},
            anchorEl: null,
            nestedAction: {}
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

    nestedActionOpen = (event, name) => {
        event.preventDefault();
        this.setState({anchorEl: event.currentTarget});
        this.state.nestedAction[name] = true;
        this.setState({nestedAction: this.state.nestedAction});
    };

    nestedActionClose = (event, name) => {
        event.preventDefault();
        this.setState({anchorEl: null});
        let navs = this.state.nestedAction;
        navs[name] = false;
        this.setState({nestedAction: navs});
    };

    getNestedMenuAndItems(definition, navName){
        const {anchorEl} = this.state;
        let thisComponent = this;
        return (
            <Menu anchorEl={anchorEl} open={this.state.nestedAction[navName] ? this.state.nestedAction[navName] : false} onClose={event =>{this.nestedActionClose(event, navName)}}>
                {
                    _.map(definition.menu, (actionDefinition, key) => {
                        return (
                            <MenuItem title={actionDefinition.label} key={key} onClick={event => {
                                if (actionDefinition.action) {
                                    actionDefinition.action(event, actionDefinition)
                                }
                                thisComponent.nestedActionClose(event, navName)
                            }}>
                                {actionDefinition.menuItem ? (actionDefinition.menuItem) : ("")}
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        )
    }

    render() {
        const { classes, title, actions, children, titleVariant, cardTop, cardActionMiddleChildren } = this.props;
        let showHideButton = (this.state.expanded ? classes.expandOpen : classes.expandClose);
        return (
            <React.Fragment>
                <Card>
                    {cardTop}
                    <CardActions className={classes.cardAction}>
                        <div>
                            <Typography variant={titleVariant} align="center">{title}</Typography>
                        </div>
                        <div>{cardActionMiddleChildren}</div>
                        <div>
                            {
                                _.map(actions, (actionDefinition, key) => {
                                    let navName = "nav" + key;
                                    return (
                                        <React.Fragment key={key}>
                                            <IconButton title={actionDefinition.label} onClick={event => {
                                                if (actionDefinition.confirmation) {
                                                    this.confirmationHandler(event, actionDefinition)
                                                } else if (actionDefinition.action) {
                                                    actionDefinition.action(event, actionDefinition)
                                                } else if (RaUtil.isEmptyObject(actionDefinition.menu) === false) {
                                                    this.nestedActionOpen(event, navName)
                                                }
                                            }}>
                                                {actionDefinition.icon ? (<actionDefinition.icon/>) : (<ErrorIcon/>)}
                                            </IconButton>
                                            {RaUtil.isEmptyObject(actionDefinition.menu) ? "" : (this.getNestedMenuAndItems(actionDefinition, navName))}
                                        </React.Fragment>
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
                        <Divider/>
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
    cardActionMiddleChildren: PropTypes.node,
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
    menuItem = undefined;
    confirmation = undefined;
    additionalInformation = undefined;
    component = undefined;
    menu = {};
    params = {};
    url = undefined;

    constructor(label, action, icon) {
        this.label = label;
        this.action = action;
        this.icon = icon;
    }

    setUrl(url){
        this.url = url;
        return this;
    }

    addAdditionalInfo(info){
        this.additionalInformation = info;
        return this;
    }

    addAction(action){
        this.action = action;
        return this;
    }

    addToMenu(name, definition){
        this.menu[name] = definition;
        return this;
    }

    addToParam(name, value){
        this.params[name] = value;
        return this;
    }

    addToMenuItem(menuItem){
        this.menuItem = menuItem;
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

    static instanceForMenu(label, menuItem) {
        return new ActionDefinition(label, undefined, undefined).addToMenuItem(menuItem)
    }
}
