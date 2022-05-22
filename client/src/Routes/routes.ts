import React from "react";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import TVShows from "../Pages/TVShows";
import UserProfile from "../Pages/UserProfile";
import AdminLogin from "../admin/AdminLogin";
import {ReviewsList} from "../admin/ReviewsList";
import {UsersList} from "../admin/UsersList";
import {UserReviews} from "../Pages/UserReviews";
import {WatchList} from "../Pages/WatchList";
import Movie from "../Pages/Movie";
import { RecoverPassword } from "../Pages/RecoverPassword";
import { ChangePassword } from "../Pages/ChangePassword";
import RegisterAdmin from "../admin/RegisterAdmin";
import { AdminResponse } from "../admin/AdminResponse";
import SearchResults from "../Pages/SearchResults";
import TvShow from "../Pages/TVShow";
import ExtendedSearch from "../Pages/ExtendedSearch";


export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    REGISTER = '/register',
    HOME = '/',
    LOGIN = '/login',
    MOVIES = '/movies/:pageNumber',
    SERIES = '/series/:pageNumber',
    USERPROFILE = '/user_profile',
    WATCHLIST = '/user_profile/watch_list',
    USERREVIEWS = '/user_profile/user_reviews',
    ADMINLOGIN = '/admin_login',
    ADMINREGISTER = '/admin_control/admin_register',
    ADMINRESPONSE ='/admin_control/admin_response',
    REVIEWSLIST = '/admin_control/reviews_list',
    USERSLIST = '/admin_control/users_list',
    MOVIE = '/movie/:id',
    RECOVERPASSWORD = '/recover_password',
    RESETPASSWORD = '/reset-password/:token',
    SEARCH = '/search/:query',
    TVSHOW = '/tv-show/:id',
    EXTENDEDSEARCH = '/extended-search/',
    EXTENDEDSEARCHQUERY = '/extended-search/:query'
}


export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN,  element: Login},
    {path: RouteNames.REGISTER,  element: Register},
    {path: RouteNames.HOME,  element: Home},
    { path: RouteNames.ADMINLOGIN, element: AdminLogin },
    { path: RouteNames.RECOVERPASSWORD, element: RecoverPassword },
    { path: RouteNames.RESETPASSWORD, element: ChangePassword },
    { path: RouteNames.SEARCH, element: SearchResults },


]

export const userRoutes: IRoute[] = [
    {path: RouteNames.HOME,  element: Home},
    {path: RouteNames.MOVIE,  element: Movie},
    {path: RouteNames.TVSHOW,  element: TvShow},
    {path: RouteNames.MOVIES,  element: Movies},
    {path: RouteNames.SERIES,  element: TVShows},
    {path: RouteNames.USERPROFILE,  element: UserProfile},
    {path: RouteNames.USERREVIEWS,  element: UserReviews},
    {path: RouteNames.WATCHLIST,  element: WatchList},
    { path: RouteNames.SEARCH, element: SearchResults },
    { path: RouteNames.EXTENDEDSEARCH, element: ExtendedSearch },
    { path: RouteNames.EXTENDEDSEARCHQUERY, element: ExtendedSearch },
]
export const adminRoutes: IRoute[] = [
    {path: RouteNames.REVIEWSLIST,  element: ReviewsList},
    {path: RouteNames.USERSLIST,  element: UsersList},
    {path: RouteNames.ADMINREGISTER,  element: RegisterAdmin},
    {path: RouteNames.ADMINRESPONSE,  element: AdminResponse},
]
