import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import authReducer from "./reducers/auth-reducer";
import appReducer from "./reducers/app-reducer";
import userReducer from "./reducers/user-reducer";
import adminReducer from "./reducers/admin-reducer";
import messageReducer from "./reducers/message-reducer";



let rootReducer = combineReducers({
    app:appReducer,
    auth: authReducer,
    user:userReducer,
    admin:adminReducer,
    message:messageReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type AppDispatch = typeof store.dispatch

const composeEnhancers = compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store