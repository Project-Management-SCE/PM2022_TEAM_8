
import $api, {ActionResponse, MessagesResponse} from "./InternalApi"
export default class MessageService {
    static async getMessages() {
        return $api.get<MessagesResponse>('/messages/get-all', ).then(res => res.data)
    }
    static async sendMessage(email:string,subject:string,text:string) {
        return $api.post<ActionResponse>('/messages/send-message', {email,subject,text}).then(res => res.data)
    }
    static async sendReply(email:string,text:string) {
        return $api.post<ActionResponse>('/messages/send-reply', {email,text}).then(res => res.data)
    }
    static async markClosed(id:string) {
        return $api.put<ActionResponse>('/messages/mark-closed', {id}).then(res => res.data)
    }
}