import RaViewComponent from "./ra-view-component";
import {TablePagination} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import {AppConstant} from "../app/app-constant";


export default class RaPagination extends RaViewComponent {

    handleChangePage = (event, page) => {
        console.log("handleChangePage " +page)
    };

    handleChangeRowsPerPage = event => {
        console.log("handleChangeRowsPerPage " + event.target.value)
    };

    render() {
        const {total, changePagination, changeItemPerPage} = this.props;
        let rowsPerPage = this.props.rowsPerPage ? this.props.rowsPerPage : AppConstant.rowsPerPage;
        let offset = this.props.offset ? this.props.offset : AppConstant.defaultOffset;
        let pagination = (
            <TablePagination
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={offset}
                rowsPerPageOptions={AppConstant.rowsPerPageOptions}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={changePagination}
                onChangeRowsPerPage={changeItemPerPage}
            />
        );
        return pagination;
    }
}

RaPagination.propTypes = {
    total: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number,
    offset: PropTypes.number,
    changePagination: PropTypes.func.isRequired,
    changeItemPerPage: PropTypes.func.isRequired
};