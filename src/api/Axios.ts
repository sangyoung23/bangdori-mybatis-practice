import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { ApiResponse, APIResponse, QueryItem } from 'types/axios.type'
import { useCallback } from 'react'
import { useAlert } from 'components/Elements/Alert/Alert'
import { useUiStateStore } from 'store/UiState'
import { useSession } from './Session'
import { useNavigate } from 'react-router-dom'

export const useAxios = () => {
    const setIsLoading = useUiStateStore(state => state.setIsLoading)
    const { clearSession } = useSession()
    const navigate = useNavigate()

    const [isAlertVisible, setIsAlertVisible] = useState(false)

    const { open } = useAlert({
        icon: 'error',
        title: '예외 발생',
        text: '일시적인 장애가 발생했습니다.<br />잠시 후 다시 실행해주세요.',
    })

    const { open: timeoutSession } = useAlert({
        icon: 'error',
        title: '로그인 정보 만료',
        text: '로그인 정보가 만료되었습니다.<br />로그인을 다시 해주시기 바랍니다.',
    })

    const errorHandler = useCallback(
        (error: AxiosError) => {
            console.log(error.status)
            if (error.status === 401 && !isAlertVisible) {
                setIsAlertVisible(true)
                timeoutSession(() => {
                    setTimeout(() => {
                        clearSession()
                        navigate('/')
                    }, 1000)
                })
            } else if (!isAlertVisible) {
                setIsAlertVisible(true)
                open()
            }
        },
        [open, timeoutSession, isAlertVisible, clearSession, navigate],
    )

    const authHeaders = useCallback((isLoginRequest = false) => {
        if (isLoginRequest) {
            return {}
        }

        let token = sessionStorage.getItem('auth-token')

        if (!token) {
            return {}
        }
        token = token.replace(/"/g, '')
        return { Authorization: `Bearer ${token}` }
    }, [])

    // 일반적인 POST 요청
    const post = useCallback(
        async <T>(
            endpoint: string,
            body: object,
            isLoginRequest = false,
        ): Promise<APIResponse<T>> => {
            setIsLoading(true)
            try {
                const response = await axios.post<ApiResponse<T>>(
                    endpoint,
                    body,
                    {
                        headers: { ...authHeaders(isLoginRequest) },
                    },
                )
                return {
                    valid: response.data.STATUS === '200',
                    result: response.data.RESULT,
                    message: response.data.MESSAGE,
                }
            } catch (error: any) {
                errorHandler(error)
                return { valid: false }
            } finally {
                setIsLoading(false)
            }
        },
        [authHeaders, errorHandler],
    )

    // FormData를 처리할 수 있는 POST 요청
    const postFormData = useCallback(
        async <T>(
            endpoint: string,
            formData: FormData,
            isLoginRequest = false,
        ): Promise<APIResponse<T>> => {
            setIsLoading(true)
            try {
                const response = await axios.post<ApiResponse<T>>(
                    endpoint,
                    formData,
                    {
                        headers: {
                            ...authHeaders(isLoginRequest),
                        },
                    },
                )
                return {
                    valid: response.data.STATUS === '200',
                    result: response.data.RESULT,
                    message: response.data.MESSAGE,
                }
            } catch (error: any) {
                errorHandler(error)
                return { valid: false }
            } finally {
                setIsLoading(false)
            }
        },
        [authHeaders, errorHandler],
    )

    const get = useCallback(
        async <T>(
            endpoint: string,
            queries: QueryItem[] = [],
            isLoginRequest = false,
        ): Promise<APIResponse<T>> => {
            setIsLoading(true)
            try {
                const params = queries.reduce((acc, query) => {
                    acc[query.key] = query.value
                    return acc
                }, {} as Record<string, string>)

                const response = await axios.get<ApiResponse<T>>(endpoint, {
                    params,
                    headers: { ...authHeaders(isLoginRequest) },
                })

                return {
                    valid: response.data.STATUS === '200',
                    result: response.data.RESULT,
                    message: response.data.MESSAGE,
                }
            } catch (error: any) {
                errorHandler(error)
                return { valid: false }
            } finally {
                setIsLoading(false)
            }
        },
        [authHeaders, errorHandler],
    )

    return { post, postFormData, get }
}
