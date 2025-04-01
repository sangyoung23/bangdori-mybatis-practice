import AInput from 'components/Elements/AInput/AInput'
import AButton from 'components/Elements/AButton/AButton'
import logo from 'assets/img/bangtori.png'
import logo2 from 'assets/img/bangdoriLogo.png'

import {
    Wrapper,
    Logo,
    Form,
    LeftSection,
    RightSection,
    Img,
    LoginBtnDiv,
} from './Login.styles'
import { useLoginForm } from 'hooks/useLoginForm'
import { useLoginSubmit } from 'hooks/useLoginSubmit'

const Login = () => {
    const { formData, handleInputChange } = useLoginForm()
    const { handleSubmit } = useLoginSubmit()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e, formData)
    }

    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <LeftSection>
                    <Logo src={logo2} alt="방도리로고" />
                    <AInput
                        onChange={handleInputChange('id')}
                        label="아이디"
                        type="text"
                        iconType="user"
                        width="100%"
                        placeholder="아이디를 입력 해주세요."
                    />
                    <AInput
                        onChange={handleInputChange('password')}
                        label="비밀번호"
                        type="password"
                        iconType="password"
                        width="100%"
                        placeholder="비밀번호를 입력 해주세요."
                    />
                    <LoginBtnDiv>
                        <AButton type="submit">로그인</AButton>
                    </LoginBtnDiv>
                </LeftSection>
                <RightSection>
                    <Img src={logo} alt="방토리 이미지" />
                </RightSection>
            </Form>
        </Wrapper>
    )
}

export default Login
