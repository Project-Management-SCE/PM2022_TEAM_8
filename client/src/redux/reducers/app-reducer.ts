import { InferActionsTypes } from "../Store";
import {getAuthUserData} from "./auth-reducer"

let initialState = {
    isLoading: true,
    error: '',
    success: ''
};

export type InitialStateType = typeof initialState
export enum AppActionTypes {
    SET_LOADING,
    SET_ERROR,
    SET_SUCCESS
}
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AppActionTypes.SET_LOADING:
        case AppActionTypes.SET_ERROR:
        case AppActionTypes.SET_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
export const appActions = {
    setLoading: (loading: boolean) => ({
        type: AppActionTypes.SET_LOADING,
        payload: {isLoading:loading}
    }),
    setError: (error: string) => ({
        type: AppActionTypes.SET_LOADING,
        payload: {error}
    }),
    setSuccess: (success: string) => ({
        type: AppActionTypes.SET_LOADING,
        payload: {success}
    })
}

export const initializeApp = () => async (dispatch: any) => {
    try {
        dispatch(appActions.setLoading(true));
        await dispatch(getAuthUserData());
    }catch (e) {
        console.log(e);
    }finally {
        dispatch(appActions.setLoading(false));
    }
}

type ActionsType = InferActionsTypes<typeof appActions>
export default appReducer;