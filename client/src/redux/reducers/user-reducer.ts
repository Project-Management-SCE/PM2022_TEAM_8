import { BaseThunkType, InferActionsTypes } from "../Store";
import { IUser } from "../../api/internalAPI/internalApiTypes";
import UserService from "../../api/internalAPI/userApi";
import { appActions } from "./app-reducer";
import { authActions } from "./auth-reducer";
import AuthService from "../../api/internalAPI/authApi";
import { MovieGenres } from "../../api/ExternalApiResponseTypes";

let initialState = {
  isLoading: false,
};

export enum UserActions {
  SET_LOADING,
}

const userReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case UserActions.SET_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export const userActions = {
  setLoading: (isLoading: boolean) =>
    ({
      type: UserActions.SET_LOADING,
      payload: { isLoading },
    } as const),
};
export const addToWatch =
  (
    user: IUser,
    id: number,
    genre_ids: number[],
    overview: string,
    poster_path: string,
    release_date: string,
    title: string
  ): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(userActions.setLoading(true));
      await UserService.addToWatch(
        user,
        id,
        genre_ids,
        overview,
        poster_path,
        release_date,
        title
      );
      dispatch(appActions.setSuccess("WatchList updated successfully!"));
    } catch (e: any) {
      const msg = e.response?.data?.message || "WatchList updated error";
      dispatch(appActions.setError(msg));
    } finally {
      dispatch(userActions.setLoading(false));
    }
  };

export const updateProfile =
  (user: IUser): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(userActions.setLoading(true));
      await UserService.updateProfile(user);
      dispatch(authActions.setAuthUserData(user, true));
      dispatch(appActions.setSuccess("Profile updated successfully!"));
    } catch (e: any) {
      const msg = e.response?.data?.message || "Profile update error";
      dispatch(appActions.setError(msg));
    } finally {
      dispatch(userActions.setLoading(false));
    }
  };
export const getRecoveryToken =
  (email: string): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(userActions.setLoading(true));
      await AuthService.getRecoveryToken(email);
      dispatch(appActions.setSuccess("Password recovery email sent!"));
    } catch (e: any) {
      const msg = e.response?.data?.message || "Email is not registered";
      dispatch(appActions.setError(msg));
    } finally {
      dispatch(userActions.setLoading(false));
    }
  };
export const resetPassword =
  (password: string, token: string): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(userActions.setLoading(true));
      await AuthService.resetPassword(password, token);
      dispatch(appActions.setSuccess("Password reset!"));
    } catch (e: any) {
      const msg = e.response?.data?.message || "Password reset failed!";
      dispatch(appActions.setError(msg));
    } finally {
      dispatch(userActions.setLoading(false));
    }
  };
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<
  typeof userActions | typeof appActions | typeof authActions
>;
type ThunkType = BaseThunkType<ActionsType>;

export default userReducer;
