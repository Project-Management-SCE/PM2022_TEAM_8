import { MovieGenres } from "../ExternalApiResponseTypes";
import $api, {ActionResponse, UsersResponse} from "./InternalApi"
import {IUser} from "./internalApiTypes";
export default class UserService {
    static async updateProfile(user:IUser) {
        return $api.put<ActionResponse>('/user/update', {user}).then(res => res.data)
    }
    static async deleteUser(email: string) {
        return $api.delete<ActionResponse>(`/user/delete/${email}`, ).then(res => res.data)
    }
    static async getUsers() {
        return $api.get<UsersResponse>(`/user/users`, ).then(res => res.data)
    }
    static async banUser(email:String,date:Date) {
        return $api.put<ActionResponse>('/user/block', {email,date}).then(res => res.data)
    }
    static async addToWatch(user:IUser,id:number,genre_ids:number[],overview:string,poster_path:string,release_date:string,title:string) {
        return $api.post<ActionResponse>('/watchlist/add', {user,id,genre_ids,overview,poster_path,release_date,title}).then(res => res.data)
    }
}