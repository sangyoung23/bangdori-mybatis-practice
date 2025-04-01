import styled from '@emotion/styled'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px;

    @media (max-width: 1024px) {
        padding: 0 20px;
    }

    @media (max-width: 768px) {
        padding: 0 10px;
    }
`

export const CommDiv = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 2rem auto;
    padding: 0 40px;
    flex-wrap: nowrap;
    gap: 20px;
    width: 100%;

    @media (max-width: 1024px) {
        flex-wrap: wrap;
        gap: 10px;
        padding: 0 20px;
    }

    @media (max-width: 768px) {
        justify-content: center;
        align-items: stretch;
        padding: 0 15px;
    }
`

export const BtnDiv = styled.div`
    display: flex;
    justify-content: end;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        align-items: stretch;
        justify-content: space-around;

        > * {
            margin-bottom: 10px;
            width: 50px;
        }
    }
`

export const MobileHeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
