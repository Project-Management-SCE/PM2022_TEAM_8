import {BaseThunkType, InferActionsTypes} from '../Store';
import {IReport, IReview, IUser} from "../../api/internalAPI/internalApiTypes";
import UserService from "../../api/internalAPI/userApi";
import {appActions} from "./app-reducer";
import MessageService from "../../api/internalAPI/messageApi";
import {Message} from "../../admin/AdminResponse";
import AuthService from "../../api/internalAPI/authApi";

let initialState = {
    users:[] as IUser[],
    messages:[] as Message[],
    reviews:[] as IReview[],
    reports :[] as IReport[],
    isFetching: false,
};

export enum UserActions {
    SET_REPORTS,
    DELETE_REVIEW,
    SET_REVIEWS ,
    SET_USERS_DATA,
    SET_MESSAGES_DATA,
    UPDATE_MESSAGE,
    DELETE_USER,
    SET_LOADING,
    SET_BANNED_USER,
    SET_UNBANNED_USER,
}
const adminReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case UserActions.SET_USERS_DATA:
        case UserActions.SET_REPORTS:
        case UserActions.SET_REVIEWS:
        case UserActions.SET_MESSAGES_DATA:
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
        case UserActions.UPDATE_MESSAGE:
            return{
                ...state,
                messages: state.messages.map(message => message.ticketID === action.payload.ticketID? { ...message, status: action.payload.status}: message)
            }
        case UserActions.DELETE_REVIEW:
            return{
                ...state,
                reviews: state.reviews.filter(review => review.reviewID !== action.payload.reviewId)
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
    setReviews: (reviews:IReview[]) => ({
        type: UserActions.SET_REVIEWS,
        payload: {reviews}
    } as const),
    setMessagesData: (messages:Message[]) => ({
        type: UserActions.SET_MESSAGES_DATA,
        payload: {messages}
    } as const),
    updateMessage: (status:string,ticketID:string) => ({
        type: UserActions.UPDATE_MESSAGE,
        payload: {status,ticketID}
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
    } as const),
    setReports: (reports:IReport[]) => ({
        type: UserActions.SET_REPORTS,
        payload: {reports}
    } as const),
    deleteReview: (reviewId:string) => ({
        type: UserActions.DELETE_REVIEW,
        payload: {reviewId}
    } as const),
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
export const registerAdmin = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        await AuthService.registerAdmin(email, password);
        dispatch(appActions.setSuccess(`Registration successful`))
    }catch (e:any) {
        const msg = e.response?.data?.message || 'Unknown registration error'
        dispatch(appActions.setError(msg))
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
export const getMessages = (): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        const data = await MessageService.getMessages()
        dispatch(adminActions.setMessagesData(data.messages))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Error fetching messages'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }
}
export const sendReply = (email:string,text:string,id:string): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        await MessageService.sendReply(email,text)
        await MessageService.markClosed(id)
        dispatch(adminActions.updateMessage('closed',id))
        dispatch(appActions.setSuccess(`Reply sent!\n Message marked as closed`))

    } catch (e: any) {
        const msg = e.response?.data?.message || 'Error sending reply!'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }
}
export const getReviews = (): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        const data = await MessageService.getReportedReviews()
        dispatch(adminActions.setReviews(data.reviews))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Error fetching reviews'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }
}

export const getReports = (reviewId:string): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        const data = await MessageService.getReports(reviewId)
        dispatch(adminActions.setReports(data.reports))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Error fetching reports'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }
}

export const deleteReview = (reviewId:string): ThunkType => async (dispatch) => {
    try {
        dispatch(adminActions.setLoading(true))
        await MessageService.deleteReview(reviewId)
        dispatch(adminActions.deleteReview(reviewId))
        dispatch(appActions.setSuccess(`Review deleted successfully`))
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Error deleting review'
        dispatch(appActions.setError(msg))
    }finally {
        dispatch(adminActions.setLoading(false))
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof adminActions | typeof appActions>
type ThunkType = BaseThunkType<ActionsType>

export default adminReducer;