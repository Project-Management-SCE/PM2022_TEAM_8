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
import {UserReviews} from "../Pages/UserReviews";
import {WatchList} from "../Pages/WatchList";
import Movie from "../Pages/Movie";
import { RecoverPassword } from "../Pages/RecoverPassword";
import { ChangePassword } from "../Pages/ChangePassword";


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
    WATCHLIST = '/user_profile/watch_list',
    USERREVIEWS = '/user_profile/user_reviews',
    ADMINLOGIN = '/admin_login',
    ADMINCONTROL = '/admin_control',
    REVIEWSLIST = '/admin_control/reviews_list',
    USERSLIST = '/admin_control/users_list',
    MOVIE = '/movie/:id',
    RECOVERPASSWORD = '/recover_password',
    CHANGEPASSWORD = '/change_password'
}


export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN,  element: Login},
    {path: RouteNames.REGISTER,  element: Register},
    {path: RouteNames.HOME,  element: Home},
    { path: RouteNames.ADMINLOGIN, element: AdminLogin },
    { path: RouteNames.RECOVERPASSWORD, element: RecoverPassword },
    { path: RouteNames.CHANGEPASSWORD, element: ChangePassword },


]

export const userRoutes: IRoute[] = [
    {path: RouteNames.HOME,  element: Home},
    {path: RouteNames.MOVIE,  element: Movie},
    {path: RouteNames.MOVIES,  element: Movies},
    {path: RouteNames.SERIES,  element: Series},
    {path: RouteNames.USERPROFILE,  element: UserProfile},
    {path: RouteNames.USERREVIEWS,  element: UserReviews},
    {path: RouteNames.WATCHLIST,  element: WatchList},
]
export const adminRoutes: IRoute[] = [
    {path: RouteNames.REVIEWSLIST,  element: ReviewsList},
    {path: RouteNames.USERSLIST,  element: UsersList},
]
