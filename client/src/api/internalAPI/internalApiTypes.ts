export interface IUser {
    id?: string
    email: string | null
    isBlocked?: boolean
    firstName: string | null
    lastName: string | null
    type: string | null
    phone: string | null
    address: string | null
}
export interface Watchlist{
    userID:string
    id:number
    genre_ids:string[]
    overview:string
    poster_path:string
    release_date:string
    title:string
}
export interface IReport {
    reviewID: string
    userID: string
    subject: string
    text: string
}
export interface IReview {
    reviewID: string
    userEmail: string
    userID: string
    movieID: string
    recommendation: boolean
    text: string
    movieTitle: string
}