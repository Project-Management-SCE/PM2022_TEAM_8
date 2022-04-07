import {BaseThunkType, InferActionsTypes} from '../Store';
import {IUser} from "../../api/internalAPI/internalApiTypes";
import UserService from "../../api/internalAPI/userApi";
import { appActions } from './app-reducer';

let initialState = {
    user: null as (IUser | null),
    isLoading: false
};

export enum UserActions {
    SET_USERS_DATA,
    SET_LOADING
}
/* TODO: Finish implementation, check UserProfile.tsx passing argument correctly,
    configure userApi.ts correctly, use controller.js and service.js*/
const userReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case UserActions.SET_USERS_DATA:
        case UserActions.SET_LOADING:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
export const userActions = {
    setProfileData: (user:IUser | null) => ({
        type: UserActions.SET_USERS_DATA,
        payload: {curr_user:user}
    } as const),
    setLoading: (isLoading: boolean) => ({
        type: UserActions.SET_LOADING,
        payload: {isLoading}
    } as const)
}


export const updateProfile = (user:IUser): ThunkType => async (dispatch) => {
    try {
        dispatch(userActions.setLoading(true))
        await UserService.updateProfile(user)
        dispatch(userActions.setProfileData(user))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Profile update error'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(userActions.setLoading(false))
    }

}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof userActions | typeof appActions>
type ThunkType = BaseThunkType<ActionsType>

export default userReducer;