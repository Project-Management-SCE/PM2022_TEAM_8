import { BaseThunkType, InferActionsTypes } from "../Store";
import { appActions } from "./app-reducer";
import MessageService from "../../api/internalAPI/messageApi";

let initialState = {
    isLoading: false,
};

export enum MessageActions {
    SET_LOADING,
}

const messageReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case MessageActions.SET_LOADING:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export const messageActions = {
    setLoading: (isLoading: boolean) =>
        ({
            type: MessageActions.SET_LOADING,
            payload: { isLoading },
        } as const),
};


export const sendMessage =
    (email:string,subject:string,text:string): ThunkType =>
        async (dispatch) => {
            try {
                dispatch(messageActions.setLoading(true));
                await MessageService.sendMessage(email,subject,text);
                dispatch(appActions.setSuccess("Form sent!"));
            } catch (e: any) {
                const msg = e.response?.data?.message || "Form submission failed!";
                dispatch(appActions.setError(msg));
            } finally {
                dispatch(messageActions.setLoading(false));
            }
        };
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<
   typeof appActions | typeof messageActions
    >;
type ThunkType = BaseThunkType<ActionsType>;

export default messageReducer;
