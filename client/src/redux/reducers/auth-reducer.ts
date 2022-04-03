import {BaseThunkType, InferActionsTypes} from '../Store';
import AuthService from "../../api/internalAPI/authApi";
import {IUser} from "../../api/internalAPI/internalApiTypes";


let initialState = {
    user: null as (IUser | null),
    isAuth: false,
    error: '',
};

export enum AuthActions {
    SET_USER_DATA,
    LOGOUT,
    SET_AUTH_ERROR
}

const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AuthActions.SET_USER_DATA:
        case AuthActions.SET_AUTH_ERROR:
        case AuthActions.LOGOUT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const authActions = {

    setAuthUserData: (user:IUser,isAuth:boolean) => ({
        type: AuthActions.SET_USER_DATA, payload: {user, isAuth}
    } as const),
    logout: () => ({
        type: AuthActions.LOGOUT,
        payload: {user: null, isAuth: false}
    } as const),
    setAuthError: (msg: string) => ({
        type: AuthActions.SET_AUTH_ERROR,
        payload: {error: msg}
    } as const),
}

export const getAuthUserData = (): ThunkTypeAuth => async (dispatch) => {
    try {
        if (localStorage.getItem('accessToken')) {
            let meData = await AuthService.me()
            dispatch(authActions.setAuthUserData(meData.user,true))
        }
    }catch (e) {
        console.log(e);
    }
}

export const login = (email: string, password: string): ThunkTypeAuth => async (dispatch) => {
    try {

        let data = await AuthService.login(email, password);
        const accessToken = data.accessToken || ''
        localStorage.setItem('accessToken', accessToken)
        let meData
        if (localStorage.getItem('accessToken')) {
            meData = await AuthService.me()
            dispatch(authActions.setAuthUserData(meData.user,true))
        }
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Incorrect login or password'
        dispatch(authActions.setAuthError(msg))
    }
}
export const logout = ():ThunkTypeAuth => async (dispatch ) => {
    localStorage.removeItem("accessToken")
    dispatch(authActions.logout())
}
export const register = (email: string, password: string,firstName:string,lastName:string): ThunkTypeAuth => async (dispatch) => {
    try {
        let data = await AuthService.register(email, password,firstName,lastName);
        const accessToken = data.accessToken as string
        localStorage.setItem('accessToken', accessToken)
        await dispatch(getAuthUserData())
    }catch (e:any) {
        const msg = e.response?.data?.message || 'Unknown registration error'
        dispatch(authActions.setAuthError(msg))
    }

}




export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof authActions >
type ThunkTypeAuth = BaseThunkType<ActionsType>

export default authReducer;