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
}