import axios from 'axios';
import {IUser} from "./internalApiTypes";
import {Message} from "../../admin/AdminResponse";
export const API_URL = process.env.BACK_URL+ "api" || `http://localhost:3001/api`

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
export interface UsersResponse {
    users: IUser[]
}
export interface MessagesResponse {
    messages: Message[]
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
