import React, {Component} from "react";
import PropTypes from "prop-types";
import ErrorIcon from '@material-ui/icons/Error';
import {
    Tab, Tabs, Paper
} from '@material-ui/core'


export default class RaTabView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
    }

    handleChange(event, index){
        this.setState({selectedIndex: index});
    }

    render() {
        const { squarePaper, variant, scrollButtons, indicatorColor, textColor, tebItems, centered } = this.props;
        let render = "";
        if (tebItems[this.state.selectedIndex] && tebItems[this.state.selectedIndex].view) {
            render = tebItems[this.state.selectedIndex].view;
        }
        return (
            <React.Fragment>
                <Paper square={squarePaper}>
                    <Tabs centered={centered}
                          value={this.state.selectedIndex}
                          onChange={(event, value) =>{this.handleChange(event, value)} }
                          variant={variant}
                          scrollButtons={scrollButtons}
                          indicatorColor={indicatorColor}
                          textColor={textColor}>
                        {tebItems.map(function (item, key) {
                            return(<Tab key={key} label={item.label} icon={<item.icon/>} disabled={item.disabled}/>);
                        })}
                    </Tabs>
                </Paper>
                {render}
            </React.Fragment>
        );
    }
}

RaTabView.propTypes = {
    squarePaper: PropTypes.bool,
    centered: PropTypes.bool,
    variant: PropTypes.string,
    scrollButtons: PropTypes.string,
    indicatorColor: PropTypes.string,
    textColor: PropTypes.string,
    tebItems: PropTypes.array.isRequired,
};

RaTabView.defaultProps = {
    scrollButtons: "on",
    variant: "scrollable",
    indicatorColor: "primary",
    textColor: "primary",
    squarePaper: true,
    centered: true,
};


export class RaTabViewDefinition {

    label = "";
    icon = ErrorIcon;
    disabled = false;
    children = undefined;
    view = undefined;

    isDisable(disable){
        this.disabled = disable;
        return this;
    }

    setChildren(children){
        this.children = children;
        return this;
    }

    constructor(label, icon, view) {
        this.label = label;
        this.icon = icon;
        this.view = view;
    }

    static instance(label, icon, view) {
        return new RaTabViewDefinition(label, icon, view)
    }
}
