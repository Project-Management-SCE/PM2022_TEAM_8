import { BaseThunkType, InferActionsTypes } from "../Store";
import {IReview, IUser, Watchlist} from "../../api/internalAPI/internalApiTypes";
import UserService from "../../api/internalAPI/userApi";
import { appActions } from "./app-reducer";
import { authActions } from "./auth-reducer";
import AuthService from "../../api/internalAPI/authApi";
import MessageService from "../../api/internalAPI/messageApi";

let initialState = {
  watchlist: [] as Watchlist[],
  isFetching: false,
  selected:"Dashboard",
  reviews: [] as IReview[],
};

export enum UserActions {
    SET_REVIEWS,
  SET_WATCHLIST_DATA,
  SET_LOADING,
  DELETE_CONTENT,
    SET_SELECTED
}

const userReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case UserActions.SET_WATCHLIST_DATA:
    case UserActions.SET_LOADING:
    case UserActions.SET_REVIEWS:
    case UserActions.SET_SELECTED:
      return {
        ...state,
        ...action.payload,
      };
    case UserActions.DELETE_CONTENT:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (content) => content.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export const userActions = {
  setWatchlistData: (watchlist: Watchlist[]) =>
    ({
      type: UserActions.SET_WATCHLIST_DATA,
      payload: { watchlist },
    } as const),
  setLoading: (isFetching: boolean) =>
    ({
      type: UserActions.SET_LOADING,
      payload: { isFetching },
    } as const),
  deleteContent: (id: number) =>
    ({
      type: UserActions.DELETE_CONTENT,
      payload: { id },
    } as const),
    setSelected: (selected:string) =>
        ({
            type: UserActions.SET_SELECTED,
            payload: {selected}
        } as const),
    setReviews: (reviews:IReview[]) =>
        ({
            type: UserActions.SET_REVIEWS,
            payload: {reviews}
        } as const)
};

export const removeFromWatchList =
  (userID: string, id: number): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(userActions.setLoading(true));
      await UserService.removeFromWatchList(userID, id);
      dispatch(appActions.setSuccess(`Movie deleted successfully`));
      dispatch(userActions.deleteContent(id));
    } catch (e: any) {
      const msg =
        e.response?.data?.message || "Error removing from user watchlist";
      dispatch(appActions.setError(msg));
    } finally {
      dispatch(userActions.setLoading(false));
    }
  };

export const getWatchlist =
  (id: string): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(userActions.setLoading(true));
      const data = await UserService.getWatchlist(id);
      dispatch(userActions.setWatchlistData(data.watchlist));
    } catch (e: any) {
      const msg = e.response?.data?.message || "Error fetching watchlist";
      dispatch(appActions.setError(msg));
    } finally {
      dispatch(userActions.setLoading(false));
    }
  };
export const addToWatch =
  (
    user: IUser,
    id: number,
    genre_ids: string[],
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    type: string,
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
        title,
        type
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

export const getReviews =
  (id: string): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(userActions.setLoading(true));
      const data = await MessageService.getReviewsByUser(id);
      dispatch(userActions.setReviews(data.reviews));
    } catch (e: any) {
      const msg = e.response?.data?.message || "Error fetching reviews";
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
