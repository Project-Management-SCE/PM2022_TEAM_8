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
    genre_ids:number[]
    overview:string
    poster_path:string
    release_date:string
    title:string
}