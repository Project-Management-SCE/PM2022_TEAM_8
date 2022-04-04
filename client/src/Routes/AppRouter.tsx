import {Route, Routes, Navigate} from "react-router-dom";
import {adminRoutes, userRoutes, publicRoutes, RouteNames} from "./routes";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/Store";
import Admin from "../Pages/Admin";
import React from "react";


export const AppRouter = () => {
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth) as boolean
    const type = useSelector<AppStateType>(state => state.auth.user?.type) as string
   // const isLoading = useSelector<AppStateType>(state => state.app.isLoading) as boolean
    return (
        isAuth &&   type === "User" ?
                <Routes>
                {userRoutes.map(route =>
                    <Route path={route.path}
                           element={<route.element/>}
                           key={route.path}
                    />
                )}
                    <Route path="*" element={<Navigate replace to={RouteNames.HOME} />} />
                </Routes>
            :
                isAuth &&   type === "Admin" ?
                        <Routes>
                        {adminRoutes.map(route =>
                            <Route path={route.path}
                                   element={<route.element/>}
                                   key={route.path}
                            />
                        )}
                            <Route path="*" element={<Navigate replace to={RouteNames.HOME} />} />
                        </Routes>
                    :
                        <Routes>
                        {publicRoutes.map(route =>
                            <Route path={route.path}
                                   element={<route.element/>}
                                   key={route.path}
                            />
                        )}
                            <Route path="*" element={<Navigate replace to={RouteNames.HOME} />} />
                        </Routes>
    );
};
