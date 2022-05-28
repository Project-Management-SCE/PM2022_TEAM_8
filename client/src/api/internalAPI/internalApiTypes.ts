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
    type: "TVSERIES" | "MOVIE"
    title:string
}
export interface IReport {
    reviewID: string
    reportedBy: string
    userID: string
    subject: string
    text: string
}
export interface IReview {
    type: "TVSERIES" | "MOVIE"
    reviewID: string
    userEmail: string
    userID: string
    movieID: string
    recommendation: boolean
    text: string
    movieTitle: string
}
export interface NewReview {
    type: "TVSERIES" | "MOVIE"
    movieID: string
    recommendation: boolean
    text: string
    movieTitle: string
}