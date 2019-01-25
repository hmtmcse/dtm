import React, { Component } from 'react';

export default class PublicLayout extends Component {
    render() {
        const Component = this.props.component;
        const route = this.props.route;
        return (
            <React.Fragment>
                <Component route={route}/>
            </React.Fragment>
        );
    }
}
