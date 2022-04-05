import React from "react";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import Series from "../Pages/Series";
import UserProfile from "../Pages/UserProfile";
import Admin from "../Pages/Admin";
import AdminLogin from "../admin/AdminLogin";

export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    ADMIN = '/admin',
    REGISTER = '/register',
    HOME = '/',
    LOGIN = '/login',
    MOVIES = '/movies',
    SERIES = '/series',
    USERPROFILE = '/user_profile',
    ADMINLOGIN = '/admin_login',
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
    {path: RouteNames.ADMIN,  element: Admin},
    {path: RouteNames.MOVIES,  element: Movies},
    {path: RouteNames.SERIES,  element: Series},
]
