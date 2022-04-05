import {BaseThunkType, InferActionsTypes} from '../Store';
import {IUser} from "../../api/internalAPI/internalApiTypes";
import UserService from "../../api/internalAPI/userApi";

let initialState = {
    curr_user: null as (IUser | null),
    isLoading: false,
    error: '',
};
/* TODO: Finish implementation, check UserProfile.tsx passing argument correctly,
    configure userApi.ts correctly, use controller.js and service.js*/
export enum UserActions {
    SET_PROFILE_DATA,
    SET_ERROR,
    SET_LOADING
}
const userReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case UserActions.SET_PROFILE_DATA:
        case UserActions.SET_ERROR:
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
        type: UserActions.SET_PROFILE_DATA,
        payload: {curr_user:user}
    } as const),
    setError: (msg: string) => ({
        type: UserActions.SET_ERROR,
        payload: {error: msg}
    } as const),
    setLoading: (isLoading: boolean) => ({
        type: UserActions.SET_LOADING,
        payload: {isLoading}
    } as const)
}


export const updateProfile = (user:IUser): ThunkType => async (dispatch) => {
    try {
        dispatch(userActions.setLoading(true))
        let data = userActions.setProfileData(user)
        dispatch(userActions.setProfileData(user))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Profile update error'
        dispatch(userActions.setError(msg))
    }finally {
        dispatch(userActions.setLoading(false))
    }

}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof userActions>
type ThunkType = BaseThunkType<ActionsType>

export default userReducer;