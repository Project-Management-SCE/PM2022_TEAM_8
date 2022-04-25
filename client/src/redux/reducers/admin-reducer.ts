import {BaseThunkType, InferActionsTypes} from '../Store';
import {IUser} from "../../api/internalAPI/internalApiTypes";
import UserService from "../../api/internalAPI/userApi";
import {appActions} from "./app-reducer";

let initialState = {
    users:[] as IUser[],
    isFetching: false,
};

export enum UserActions {
    SET_USERS_DATA,
    DELETE_USER,
    SET_LOADING,
    SET_BANNED_USER,
    SET_UNBANNED_USER,
}
const adminReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case UserActions.SET_USERS_DATA:
        case UserActions.SET_LOADING:
            return {
                ...state,
                ...action.payload
            }
        case UserActions.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.email !== action.payload.email)
            }
        case UserActions.SET_BANNED_USER:
            return {
                ...state,
                users: state.users.map(user => user.email === action.payload.email? {...user, isBlocked: true}: user)
            }
        case UserActions.SET_UNBANNED_USER:
            return {
                ...state,
                users: state.users.map(user => user.email === action.payload.email? {...user, isBlocked: false}: user)
            }
        default:
            return state;
    }
}
export const adminActions = {
    setUsersData: (users:IUser[]) => ({
        type: UserActions.SET_USERS_DATA,
        payload: {users}
    } as const),
    setBannedUser: (email:string) => ({
        type: UserActions.SET_BANNED_USER,
        payload: {email}
    } as const),
    setUnbannedUser: (email:string) => ({
        type: UserActions.SET_UNBANNED_USER,
        payload: {email}
    } as const),
    setLoading: (isFetching: boolean) => ({
        type: UserActions.SET_LOADING,
        payload: {isFetching}
    } as const),
    deleteUser: (email:string) => ({
        type: UserActions.DELETE_USER,
        payload: {email}
    })
}

export const banUser = (email:string,date:Date): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        await UserService.banUser(email,date)
        dispatch(appActions.setSuccess(`User successfully baned until ${date}`))
        dispatch(adminActions.setBannedUser(email))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'User ban error'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }

}
export const unbanUser = (email:string): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        await UserService.unbanUser(email)
        dispatch(appActions.setSuccess(`User ${email} successfully unbanned `))
        dispatch(adminActions.setUnbannedUser(email))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'User ban error'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }

}
export const deleteUser = (email:string): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        await UserService.deleteUser(email)
        dispatch(appActions.setSuccess(`${email} deleted successfully`))
        dispatch(adminActions.deleteUser(email))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Profile update error'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }

}
export const getUsers = (): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        const data = await UserService.getUsers()
        dispatch(adminActions.setUsersData(data.users))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Error fetching users'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }

}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof adminActions | typeof appActions>
type ThunkType = BaseThunkType<ActionsType>

export default adminReducer;