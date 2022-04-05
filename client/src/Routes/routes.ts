import React from "react";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import Series from "../Pages/Series";
import UserProfile from "../Pages/UserProfile";
import AdminLogin from "../admin/AdminLogin";
import AdminControl from "../admin/AdminControl";
import {ReviewsList} from "../admin/ReviewsList";
import {UsersList} from "../admin/UsersList";

export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    REGISTER = '/register',
    HOME = '/',
    LOGIN = '/login',
    MOVIES = '/movies',
    SERIES = '/series',
    USERPROFILE = '/user_profile',
    ADMINLOGIN = '/admin_login',
    ADMINCONTROL = '/admin_control',
    REVIEWSLIST = '/admin_control/reviews_list',
    USERSLIST = '/admin_control/users_list',
}


export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN,  element: Login},
    {path: RouteNames.REGISTER,  element: Register},
    {path: RouteNames.HOME,  element: Home},
    {path: RouteNames.ADMINLOGIN,  element: AdminLogin},
]

export const userRoutes: IRoute[] = [
    {path: RouteNames.HOME,  element: Home},
    {path: RouteNames.MOVIES,  element: Movies},
    {path: RouteNames.SERIES,  element: Series},
    {path: RouteNames.USERPROFILE,  element: UserProfile},
]
export const adminRoutes: IRoute[] = [
    {path: RouteNames.HOME,  element: Home},
    {path: RouteNames.MOVIES,  element: Movies},
    {path: RouteNames.SERIES,  element: Series},
    {path: RouteNames.ADMINLOGIN,  element: AdminLogin},
    {path: RouteNames.ADMINCONTROL,  element: AdminControl},
    {path: RouteNames.REVIEWSLIST,  element: ReviewsList},
    {path: RouteNames.USERSLIST,  element: UsersList},
]
