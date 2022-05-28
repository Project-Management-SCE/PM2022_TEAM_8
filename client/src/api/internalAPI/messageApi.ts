
import $api, {ActionResponse, MessagesResponse, ReportsResponse, ReviewResponse, ReviewsResponse} from "./InternalApi"
import {NewReview} from "./internalApiTypes";
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
    static async deleteReview(reviewId:string) {
        return $api.delete<ActionResponse>(`/review/remove/${reviewId}`, ).then(res => res.data)
    }
    static async getReviewsByUser(userId:string) {
        return $api.get<ReviewsResponse>(`/review/get-by-user/${userId}`, ).then(res => res.data)
    }
    static async getReviewsByMovie(movieId:string) {
        return $api.get<ReviewsResponse>(`/review/get-by-movie/${movieId}`, ).then(res => res.data)
    }
    static async getReportedReviews() {
        return $api.get<ReviewsResponse>(`/review/reported-reviews`, ).then(res => res.data)
    }
    static async getReports(reviewId:string) {
        return $api.get<ReportsResponse>(`/report/get/${reviewId}`, ).then(res => res.data)
    }
    static async addReview(review:NewReview) {
        return $api.post<ReviewResponse>(`/review/add`,{...review} ).then(res => res.data)
    }
    static async addReport(reviewId :string, subject :string, text:string) {
        return $api.post<ReviewResponse>(`/report/report-add`,{reviewId, subject,text} ).then(res => res.data)
    }
}