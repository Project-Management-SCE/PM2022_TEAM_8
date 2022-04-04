import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/Store";
import {notification} from "antd";
import { appActions } from '../redux/reducers/app-reducer';

const Notifications:FC = () => {
    const error = useSelector<AppStateType>(state => state.app.error) as string
    const success = useSelector<AppStateType>(state => state.app.success) as string
    const dispatch = useDispatch()
    useEffect(()=> {
        if(error){
            notification.error({
                message: 'Error',
                description: error,
                placement: 'topLeft',
                duration: 7,
            });
            dispatch(appActions.setError(''))
        }
    },[error])
    useEffect(()=> {
        if(success){
            notification.success({
                message: 'Success',
                description: success,
                placement: 'topLeft',
                duration: 7,
            });
            dispatch(appActions.setSuccess(''))
        }
    },[success])
    return (
        <></>
    );
};

export default Notifications;