import $api, {ActionResponse, UsersResponse} from "./InternalApi"
import {IUser} from "./internalApiTypes";
export default class UserService {
    static async updateProfile(user:IUser) { // TODO: Figure out what's going on here
        return $api.post<ActionResponse>('/user/update', {user}).then(res => res.data)
    }
    static async deleteUser(email: string) { // TODO: Figure out what's going on here
        return $api.delete<ActionResponse>(`/user/delete/${email}`, ).then(res => res.data)
    }
    static async getUsers() { // TODO: Figure out what's going on here
        return $api.get<UsersResponse>(`/user/users`, ).then(res => res.data)
    }
}