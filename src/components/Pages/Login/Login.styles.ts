import styled from '@emotion/styled'

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7fa;
`
export const Title = styled.h1`
    font-size: 48px;
    font-weight: 900;
    background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    margin-bottom: 20px;
    text-align: center;
`

export const Form = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 1000px;
    height: 700px;

    @media (max-width: 1024px) {
        flex-direction: column;
        width: 90%;
        height: auto;
        padding: 30px 15px;
    }
`

export const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 45%;

    @media (max-width: 1024px) {
        width: 100%;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export const RightSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 100%;

    @media (max-width: 1024px) {
        width: 100%;
    }
`

export const Img = styled.img`
    max-width: 100%;
    max-height: 600px;
    object-fit: contain;
    border-radius: 15px;
`

export const Logo = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`

export const LoginBtnDiv = styled.div`
    display: flex;
    justify-content: right;
`
