import { LoginFormData, LoginResponse } from 'types/Login.type'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'components/Elements/Alert/Alert'
import { useAxios } from 'api/Axios'
import { useSession } from 'api/Session'

export const useLoginSubmit = () => {
    const { post } = useAxios()
    const navigate = useNavigate()
    const { setSession } = useSession()

    const errorAlert = useAlert({
        icon: 'error',
        title: '알림',
        text: '아이디와 비밀번호를 다시 확인해주세요.',
    })

    const successAlert = useAlert({
        icon: 'success',
        title: '알림',
        text: '로그인 되었습니다.',
    })

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        formData: LoginFormData,
    ) => {
        e.preventDefault()

        try {
            const response = await post<LoginResponse>(
                '/api/user/login',
                {
                    id: formData.id,
                    password: formData.password,
                },
                true,
            )

            if (response.valid && response.result) {
                saveUserSession(response.result as unknown as LoginResponse)

                successAlert.open(() => {
                    navigate('/home')
                })
            } else {
                errorAlert.open()
            }
        } catch (error) {
            console.error('로그인 에러:', error)
            errorAlert.open()
        }
    }

    const saveUserSession = (userData: LoginResponse) => {
        setSession('auth-token', userData.token)
        setSession('username', userData.username)
        setSession('userId', userData.userId)
        setSession('userNo', userData.userNo)
    }

    return {
        handleSubmit,
    }
}
