export interface LoginResponse {
    userNo: number
    userId: string
    username: string
    token: string
}

export interface LoginFormData {
    id: string
    password: string
}
