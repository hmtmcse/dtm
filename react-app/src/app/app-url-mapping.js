import LoginView from './../views/login-view';
import DashboardView from '../views/dashboard/dashboard-view';
import NotFoundView from './../views/not-found-view';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import PetsIcon from '@material-ui/icons/Pets';
import DomainIcon from '@material-ui/icons/Domain';
import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TodoMainView, {TodoOtherUrls} from "../views/todo/todo-main-view";
import UserMainView, {UserOtherUrls} from "../views/user/user-main-view";
import WingMainView from "../views/wing/wing-main-view";
import MySpaceMainView from "../views/my-space/my-space-main-view";
import ActivityMainView from "../views/activity/activity-main-view";
import PublicLayout from "../views/layouts/public-layout";
import PrivateLayout from "../views/layouts/private-layout";
import {AuthenticationService} from "../services/authentication-service";


const PublicLayoutViews = [
    {
        path: "/login",
        component: LoginView,
        isActive: true,
    }
];

const PrivateLayoutViews = [
    {
        path: "/",
        name: "Dashboard",
        icon: DashboardIcon,
        component: DashboardView,
        isLeftNav: false,
        isActive: true,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: DashboardIcon,
        component: DashboardView,
        isLeftNav: AuthenticationService.isEnableNavigation("dashboard"),
        isActive: true,
    },
    {
        path: "/todo",
        name: "Todo",
        icon: EventNoteIcon,
        component: TodoMainView,
        isLeftNav: AuthenticationService.isEnableNavigation("todo"),
        isActive: true,
        routes: TodoOtherUrls,
    },
    {
        path: "/wing",
        name: "Wing",
        icon: CallSplitIcon,
        component: WingMainView,
        isLeftNav: AuthenticationService.isEnableNavigation("wing"),
        isActive: true,
    },
    {
        path: "/activity",
        name: "Activity",
        icon: PetsIcon,
        component: ActivityMainView,
        isLeftNav: AuthenticationService.isEnableNavigation("activity"),
        isActive: true,
    },
    {
        path: "/my-space",
        name: "My Space",
        icon: DomainIcon,
        component: MySpaceMainView,
        isLeftNav: AuthenticationService.isEnableNavigation("mySpace"),
        isActive: true,
    },
    {
        path: "/user",
        name: "User",
        icon: BubbleChartIcon,
        component: UserMainView,
        isLeftNav: AuthenticationService.isEnableNavigation("user"),
        isActive: AuthenticationService.isEnableNavigation("user"),
        routes: UserOtherUrls,
    }
];

const nestedRoutes = nestedRoutes =>{
    if (nestedRoutes.routes) {
       return nestedRoutes.routes.map((route, key) => {
            const {component, path, isActive} = route;
            if (isActive) {
                return (
                    <Route
                        exact
                        path={path}
                        key={key}
                        render={(route) => <PrivateLayout component={component} route={route}/>}/>
                )
            }
        })
    }
};

export default class UrlMapping extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {PublicLayoutViews.map((route, key) => {
                        const {component, path, isActive} = route;
                        if (isActive) {
                            return (
                                <Route
                                    exact
                                    path={path}
                                    key={key}
                                    render={(route) => <PublicLayout component={component} route={route}/>}
                                />
                            )
                        }
                    })}
                    {PrivateLayoutViews.map((route, key) => {
                        const {component, path, isActive} = route;
                        if (isActive) {
                            return (
                                <Route
                                    exact
                                    path={path}
                                    key={key}
                                    render={(route) => <PrivateLayout component={component} route={route}/>}/>
                            )
                        }
                    })}
                    {PrivateLayoutViews.map((route, key) => nestedRoutes(route))}
                    <Route component={NotFoundView}/>
                </Switch>
            </BrowserRouter>
        );
    }
}


export {
    PrivateLayoutViews
};