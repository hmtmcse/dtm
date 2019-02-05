import React, {Component} from 'react';
import {RaUtil} from './ra-util';
import RaSnackBar from './ra-snack-bar';
import axios from 'axios';
import {AuthenticationService} from "../services/authentication-service";
import RaStaticHolder from "../artifacts/ra-static-holder";
import {AppConstant} from "../app/app-constant";
import {ApiURL} from "../app/api-url";
import {RaGsConditionMaker} from "./ra-gs-condition-maker";


export default class RaViewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSystemProgressBarEnabled: false,
            showSystemSnackBar: false,
            systemSnackBarVariant: "success",
            systemSnackBarMessage: "Empty Message",
            formData: {},
            formError: {},
            order: "desc",
            orderBy: "id",
            total: 0,
            max: 0,
            paginationOffset: 0,
        };
    }

    showProgressbar = () => {
        this.setState({isSystemProgressBarEnabled: true})
    };

    hideProgressbar = () => {
        this.setState({isSystemProgressBarEnabled: false})
    };

    closeSnackBar = () => {
        this.setState({showSystemSnackBar: false});
    };

    showSuccessInfo = (message) => {
        this.setState({
            showSystemSnackBar: true,
            systemSnackBarVariant: "success",
            systemSnackBarMessage: message
        });
    };

    showErrorInfo = (message) => {
        this.setState({
            showSystemSnackBar: true,
            systemSnackBarVariant: "error",
            systemSnackBarMessage: message
        });
    };


    sortProcessor (name){
        const orderBy = name ? name : this.state.orderBy;
        let order = 'desc';
        if (this.state.orderBy === name && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({order, orderBy});
        return RaGsConditionMaker.order({}, name, order);
    }

    goToUrl = (url, event, state) => {
        if (event) {
            event.preventDefault();
        }
        this.props.route.history.push(url, state)
    };


    goToUrlWithMessage = (url, message, isSuccess = true) => {
        RaStaticHolder.addMessageData(message, isSuccess);
        this.goToUrl(url);
    };

    getValueFromParams(key) {
        if (this.props.route && this.props.route.match){
            return this.props.route.match.params[key];
        }
        return undefined;
    }

    getValueFromObject(object, key, defaultValue = "") {
        if (object && object[key]){
            return object[key];
        }
        return defaultValue;
    }

    isInputValue(fieldName) {
        if (this.state.formData && this.state.formData[fieldName]) {
            return this.state.formData[fieldName];
        }
    }

    getFormDataValue(fieldName, defaultValue = "") {
        let value = this.isInputValue(fieldName);
        if (value !== undefined){
            return value;
        }
        return defaultValue;
    }

    setInputValue(fieldName, value) {
        this.setState((state) => {
            let formEditData = {...state.formData};
            formEditData[fieldName] = value;
            return {formData: formEditData};
        });
    }

    loadOffsetMax(condition){
        if (condition === undefined){
            condition = {};
        }
        condition.max = this.state.max;
        condition.offset = this.state.offset;
        return condition;
    }

    loadList(condition = {}){}

    getStateValue(key, defaultValue){
        return this.state[key] ? this.state[key] : defaultValue;;
    }

    paginationProcessor(){
        return{
            total: this.getStateValue("total", 0),
            rowsPerPage: this.getStateValue("max", AppConstant.rowsPerPage),
            offset: this.getStateValue("paginationOffset", 0),
            changePagination: (event, page) => {
                this.state.offset = this.state.max * page;
                if (this.state.paginationOffset !== page){
                    this.state.paginationOffset = page;
                    this.loadList();
                }
            },
            changeItemPerPage:(event) => {
                this.state.max = event.target.value;
                this.loadList();
            },
        }
    }

    _isInputErrorMessage(fieldName) {
        if (this.state.formError[fieldName] && this.state.formError[fieldName].message) {
            return this.state.formError[fieldName].message
        }
        return ""
    }

    _isInputError(fieldName) {
        if (this.state.formError[fieldName] && this.state.formError[fieldName].isError) {
            return this.state.formError[fieldName].isError
        }
        return false
    }

    _onChangeSetInputValue(name, value) {
        if (this.state.formData !== undefined) {
            this.state.formData[name] = value;
        }
        this.setState((state) => {
            let formError = {...state.formError};
            if (formError[name] !== undefined) {
                delete formError[name];
            }
            return {formError: formError};
        });
    }

    _onChangeInputProcessor(fieldName, onChangeCallBack) {
        return {
            error: this.state.formError[fieldName] !== undefined ? this._isInputError(fieldName) : false,
            name: fieldName,
            value: this.state.formData[fieldName] !== undefined ? this.isInputValue(fieldName) : "",
            onChange: (event) => {
                event.preventDefault();
                const target = event.target;
                const value = target.type === 'checkbox' ? target.checked : target.value;
                const name = target.name;
                this._onChangeSetInputValue(name, value);
                if (onChangeCallBack !== undefined) {
                    onChangeCallBack(event, fieldName, value);
                }
            }
        }
    }

    onChangeTextFieldProcessor(fieldName, onChangeCallBack) {
        let onChangeData = this._onChangeInputProcessor(fieldName, onChangeCallBack);
        onChangeData.helperText = this.state.formError[fieldName] !== undefined ? this._isInputErrorMessage(fieldName) : "";
        return onChangeData;
    }


    onChangeRaSelectProcessor(fieldName, options, defaultValue) {
        let onChangeProcessor = this._onChangeInputProcessor(fieldName);
        this.state.selectData = {};
        onChangeProcessor.onChange = data => {
            if (data){
                this.setInputValue(fieldName, data.value);
                this._onChangeSetInputValue(fieldName, data.value);
                this.setState((state) => {
                    let selectData = {...state.selectData};
                    selectData[fieldName] = data;
                    return {selectData: selectData};
                });
            }
        };
        onChangeProcessor.options = options;
        onChangeProcessor.value = this.state.selectData[fieldName] ? this.state.selectData[fieldName] : (this.state.formData[fieldName] ? (options.filter(option => option.value === this.state.formData[fieldName])[0]) : defaultValue);
        return onChangeProcessor;
    }

    onChangeSelectProcessor(fieldName, onChangeCallBack) {
        let onChangeSelectCallBack = (event, fieldName, fieldValue) => {
            this.setInputValue(fieldName, fieldValue);
            if (onChangeCallBack !== undefined) {
                onChangeCallBack(event, fieldName);
            }
        };
        let onChangeData = this._onChangeInputProcessor(fieldName, onChangeSelectCallBack);
        return onChangeData;
    }

    helpTextErrorMessageProcessor(fieldName) {
        return {
            error: this.state.formError[fieldName] !== undefined ? this._isInputError(fieldName) : false,
            children: this.state.formError[fieldName] !== undefined ? this._isInputErrorMessage(fieldName) : "",
        }
    }

    formControlErrorMessageProcessor(fieldName) {
        return {
            error: this.state.formError[fieldName] !== undefined ? this._isInputError(fieldName) : false
        }
    }

    showFlashMessage() {
        if (RaStaticHolder.message.message) {
            if (RaStaticHolder.message.isSuccess) {
                this.showSuccessInfo(RaStaticHolder.message.message)
            } else {
                this.showErrorInfo(RaStaticHolder.message.message)
            }
        }
        RaStaticHolder.message = {};
    }

    processFormResponse = (response, successRedirectUrl, successMessage, failedRedirectUrl, failedMessage) => {
        let success = {successRedirectUrl: successRedirectUrl, successMessage: successMessage};
        let failed = {failedRedirectUrl: failedRedirectUrl, failedMessage: failedMessage};
        this.processFormResponseAdvance(response, success, failed)
    };

    responseErrorProcessor(response){
        if (response.errorDetails) {
            response.errorDetails.forEach((data, key) => {
                if (data.fieldName) {
                    this.state.formError[data.fieldName] = {};
                    this.state.formError[data.fieldName].isError = true;
                    this.state.formError[data.fieldName].message = data.message;
                }
            });
        }
    }

    processFormResponseAdvance = (response, success, failed) => {
        if (response.isSuccess) {
            if (success.successRedirectUrl) {
                RaStaticHolder.addMessageData(success.successMessage ? success.successMessage : response.message);
                this.goToUrl(success.successRedirectUrl);
                if (success.callBack){
                    success.callBack(response)
                }
            }
        } else {
            if (failed.failedRedirectUrl) {
                RaStaticHolder.addMessageData(failed.failedMessage ? failed.failedMessage : response.message);
                this.goToUrl(failed.failedRedirectUrl)
            } else if (response.errorDetails) {
                this.responseErrorProcessor(response);
            } else if (response.message) {
                this.showErrorInfo(response.message)
            }
            if (failed.callBack){
                failed.callBack(response)
            }
        }
    };


    callToApiByAxios(dataSet, success, failed) {
        this.showProgressbar();
        if (dataSet !== undefined && dataSet.url !== undefined) {
            dataSet.url = ApiURL.BaseURL + dataSet.url
        }
        axios(dataSet).then((response) => {
            if (success !== undefined) {
                success(response);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                AuthenticationService.logout();
            } else if (failed !== undefined) {
                failed(error);
            } else {
                this.showErrorInfo(error.message);
            }
        }).then(() => {
            this.hideProgressbar();
        });
    }


    postToApi(url, data, success, failed) {
        let dataSet = {
            method: 'post',
            url: url,
            data: data
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    postJsonToApi(url, data, success, failed) {
        let dataSet = {
            method: 'post',
            url: url,
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    deleteToApi() {}

    deleteJsonToApi(url, data, success, failed) {
        let dataSet = {
            method: 'delete',
            url: url,
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };
        this.callToApiByAxios(dataSet, success, failed);
    }


    getToApi(url, success) {
        let dataSet = {
            method: 'get',
            url: url
        };
        this.callToApiByAxios(dataSet, success);
    }

    getList() {
    }

    getBy() {
    }

    postBy() {
    }

    postList() {
    }

    appRender() {
        return (
            <h1>React Application View Component</h1>
        );
    }


    render() {
        return (
            <React.Fragment>
                {RaUtil.showLoader(this.state.isSystemProgressBarEnabled)}
                <RaSnackBar variant={this.state.systemSnackBarVariant ? this.state.systemSnackBarVariant : "error"}
                            isOpen={this.state.showSystemSnackBar}
                            message={this.state.systemSnackBarMessage} onClose={this.closeSnackBar}/>
                {this.appRender()}
            </React.Fragment>
        )
    }
}
