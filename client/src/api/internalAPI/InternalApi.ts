import axios from 'axios';
import {IReport, IReview, IUser, Watchlist} from "./internalApiTypes";
import {Message} from "../../admin/AdminResponse";
export const API_URL = process.env.REACT_APP_BACK_URL || `http://localhost:3001/api`
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})
$api.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})

export interface ActionResponse extends Response{
    result: "Success"
}
export interface ReviewsResponse extends Response{
   reviews:IReview[]
}
export interface ReviewResponse extends Response{
    review:IReview
}
export interface ReportsResponse extends Response{
    reports:IReport[]
}
export interface UsersResponse {
    users: IUser[]
}
export interface MessagesResponse {
    messages: Message[]
}
export interface WatchlistResponse {
    watchlist: Watchlist[]
}
export interface AuthResponse extends Response{
    accessToken?: string
}
export interface AuthMeResponse extends AuthResponse{
    user:IUser
}

export interface Response{
    message?:string
    errors?: any[]
}
export default $api;
