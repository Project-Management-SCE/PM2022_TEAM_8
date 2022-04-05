import $api ,{AuthResponse,AuthMeResponse} from "./InternalApi"
export default class AuthService {
    static async login(email: string, password: string) {
        return $api.post<AuthResponse>('/user/login', {email, password}).then(res => res.data)
    }
    static async loginAdmin(email: string, password: string) {
        return $api.post<AuthResponse>('/user/login-admin', {email, password}).then(res => res.data)
    }

    static async register(email: string, password: string,firstName:string,lastName:string){
        return $api.post<AuthResponse>('/user/register', {email, password,firstName,lastName}).then(res => res.data)
    }
    static async me(){
        return $api.get<AuthMeResponse>('/user/me').then(res => res.data)
    }
}