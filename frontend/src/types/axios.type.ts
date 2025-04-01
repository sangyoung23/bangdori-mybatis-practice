interface ApiResult<T> {
    LIST: T[]
    [key: string]: any
}

export interface ApiResponse<T> {
    STATUS: string
    RESULT: ApiResult<T>
    MESSAGE: any
}

export interface APIResponse<T> {
    valid: boolean
    result?: ApiResult<T>
    message?: string
}

export interface QueryItem {
    key: string
    value: string
}
