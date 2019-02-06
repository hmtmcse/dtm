import React, {Component} from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography, NoSsr, TextField, Paper, Chip, MenuItem
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {emphasize} from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});


function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({inputRef, ...props}) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

export const RaSelectUtil = {

    getAllValues: (value) => {
        let values = [];
        if (value){
            value.filter(option => {
               values.push(option.value);
            });
            return values;
        }
        return null;
    },

    getSingleValue: (value) => {
        if (value){
            return value.value;
        }
        return null;
    },

    getValue:(value) => {
        if (Array.isArray(value)){
            return RaSelectUtil.getAllValues(value);
        }
        return RaSelectUtil.getSingleValue(value);
    }
};

class RaSelect extends Component {

    singleSelectFromOptions(options, value){
        console.log(options.filter(option => option.value === value));
        if (value){
            return options.filter(option => option.value === value)
        }
        return null;
    }

    multipleSelectFromOptions(options, value){
        let values = [];
        if (value){
            options.filter(option => {
                if (value.includes(option.value)){
                    values.push(option);
                }
                return values;
            })
        }
        return null;
    }

    selectFromOptions(options, value) {
        if (!options) {
            return null;
        }
        if (Array.isArray(value)) {
            return this.multipleSelectFromOptions(options, value);
        } else {
            return this.singleSelectFromOptions(options, value);
        }
    }

    render() {
        const {classes, theme, options, label, isMulti, placeholder, isClearable, onChange, value, defaultSelect, isClearVaule} = this.props;
        const selectStyles = {
            menu: provided => ({ ...provided, zIndex: 9999 }),
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        let attrs = {
            classes: classes,
            styles: selectStyles,
            options: options,
            onChange: onChange,
            isMulti: isMulti,
            isClearable: isClearable,
        };
        attrs.defaultValue = defaultSelect;

        if (placeholder) {
            attrs.placeholder = placeholder;
        }

        if (label) {
            attrs.textFieldProps ={
                label: label,
                    InputLabelProps: {
                    shrink: true,
                },
            };
        }
        return (
            <NoSsr><Select {...attrs} components={components}/></NoSsr>
        );
    }
}

export default withStyles(styles, {withTheme: true})(RaSelect);

RaSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    defaultSelect: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.node,
    isClearable: PropTypes.bool,
    isMulti: PropTypes.bool,
    label: PropTypes.node,
};

RaSelect.defaultProps = {
    label: undefined,
    isMulti: false,
    isClearable: false,
    placeholder: undefined,
};
