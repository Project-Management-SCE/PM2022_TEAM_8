import {BaseThunkType, InferActionsTypes} from '../Store';
import AuthService from "../../api/internalAPI/authApi";
import {IUser} from "../../api/internalAPI/internalApiTypes";
import {appActions} from "./app-reducer";


let initialState = {
    user: null as (IUser | null),
    isAuth: false,
};

export enum AuthActions {
    SET_USER_DATA,
    LOGOUT
}

const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AuthActions.SET_USER_DATA:
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


export const login = (email: string, password: string ,isAdminLogin:boolean = false): ThunkTypeAuth => async (dispatch) => {
    try {
        let data;
        if(isAdminLogin){
            data = await AuthService.loginAdmin(email, password);
        }else{
            data = await AuthService.login(email, password);
        }
        const accessToken = data.accessToken || ''
        localStorage.setItem('accessToken', accessToken)
        let meData
        if (localStorage.getItem('accessToken')) {
            meData = await AuthService.me()
            dispatch(authActions.setAuthUserData(meData.user,true))
            dispatch(appActions.setSuccess('Login successful'))
        }
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Incorrect login or password!!'
        dispatch(appActions.setError(msg))
    }
}

export const logout = ():ThunkTypeAuth => async (dispatch ) => {
    localStorage.removeItem("accessToken")
    dispatch(authActions.logout())
}
export const register = (email: string, password: string,firstName:string,lastName:string,phone:string,address:string): ThunkTypeAuth => async (dispatch) => {
    try {
        let data = await AuthService.register(email, password,firstName,lastName,phone,address);
        const accessToken = data.accessToken as string
        localStorage.setItem('accessToken', accessToken)
        await dispatch(getAuthUserData())
        dispatch(appActions.setSuccess(`Registration successful\n You are logged in automatically`))
    }catch (e:any) {
        const msg = e.response?.data?.message || 'Unknown registration error'
        dispatch(appActions.setError(msg))
    }

}




export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof authActions | typeof appActions>
type ThunkTypeAuth = BaseThunkType<ActionsType>

export default authReducer;