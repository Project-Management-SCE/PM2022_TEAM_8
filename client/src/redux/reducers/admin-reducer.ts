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
    SET_LOADING
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
        default:
            return state;
    }
}
export const adminActions = {
    setUsersData: (users:IUser[]) => ({
        type: UserActions.SET_USERS_DATA,
        payload: {users}
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