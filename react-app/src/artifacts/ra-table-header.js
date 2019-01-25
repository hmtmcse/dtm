import RaViewComponent from "./ra-view-component";
import React from "react";
import {
    TableRow, TableCell, TableHead, TableSortLabel, Tooltip
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";


export class RaTableHeaderDefinition {
    id = "";
    numeric = false;
    disablePadding = false;
    label = "";
    title = "";
    enableSort = true;

     setId(value) {
        this.id = value;
        return this;
    }

    setNumeric(value) {
        this.numeric = value;
        return this;
    }

    setDisablePadding(value) {
        this.disablePadding = value;
        return this;
    }

    setLabel(value) {
        this.label = value;
        return this;
    }

    setTitle(value) {
        this.title = value;
        return this;
    }


    setEnableSort(value) {
        this.enableSort = value;
        return this;
    }


    static instance(id, label, enableSort = true) {
        return new RaTableHeaderDefinition().setId(id).setLabel(label).setEnableSort(enableSort)
    }
}



export default class RaTableHeader extends RaViewComponent {

    sortableHandler = row => event => {
        this.props.clickForSort(row.id, row, event);
    };

    enableSorting(order, orderBy, definition){
        if (!definition.enableSort){
            let title = (definition.title ? definition.title : definition.label);
            return (<Tooltip title={title}><span>{title}</span></Tooltip>);
        } else {
            return (
                <Tooltip
                    title={definition.title ? definition.title : definition.label}
                    enterDelay={300}>
                <TableSortLabel
                    active={orderBy === definition.id}
                    direction={order}
                    onClick={this.sortableHandler(definition)}>{definition.label}</TableSortLabel>
                </Tooltip>
            );
        }

    }

    render() {
        const {order, orderBy, rows, enableAction} = this.props;
        let actionHeader = "";
        if (enableAction){
            actionHeader = (<TableCell numeric>Actions</TableCell>);
        }

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}>
                                {this.enableSorting(order, orderBy, row)}
                            </TableCell>
                        );
                    }, this)}
                    {actionHeader}
                </TableRow>
            </TableHead>
        );
    }
}

RaTableHeader.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    clickForSort: PropTypes.func.isRequired,
    enableAction: PropTypes.bool
};

RaTableHeader.defaultProps = {
    enableAction: true
};