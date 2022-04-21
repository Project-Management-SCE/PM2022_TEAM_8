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