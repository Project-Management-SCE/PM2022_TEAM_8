import $api ,{AuthResponse,} from "./InternalApi"
export default class UserService {
    static async update(email: string, password: string) { // TODO: Figure out what's going on here
        return $api.post<AuthResponse>('/user/login', {email, password}).then(res => res.data)
    }
}