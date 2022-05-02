import $api, {AuthResponse, AuthMeResponse, ActionResponse} from "./InternalApi"
export default class AuthService {
    static async login(email: string, password: string) {
        return $api.post<AuthResponse>('/user/login', {email, password}).then(res => res.data)
    }
    static async loginAdmin(email: string, password: string) {
        return $api.post<AuthResponse>('/user/login-admin', {email, password}).then(res => res.data)
    }

    static async register(email: string, password: string,firstName:string,lastName:string,phone:string,address:string){
        return $api.post<AuthResponse>('/user/register', {email, password,firstName,lastName,phone,address}).then(res => res.data)
    }
    static async registerAdmin(email: string, password: string){
        return $api.post<ActionResponse>('/user/register-admin', {email, password}).then(res => res.data)
    }
    static async me(){
        return $api.get<AuthMeResponse>('/user/me').then(res => res.data)
    }
    static async getRecoveryToken(email:string){
        return $api.post<ActionResponse>('/user/recover-token',{email}).then(res => res.data)
    }
    static async resetPassword(password:string, token:string){
        return $api.post<ActionResponse>('/user/reset-password',{password,token}).then(res => res.data)
    }
}