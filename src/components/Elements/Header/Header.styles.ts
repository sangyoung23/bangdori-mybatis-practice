import styled from '@emotion/styled'

export const NavBars = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: 80px;
    background-color: #f7f7fa;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

    @media (max-width: 1024px) {
        padding: 0 20px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        padding: 15px 20px;
        gap: 15px;
    }
`

export const PageDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 450px;
    margin-left: 2rem;

    @media (max-width: 1024px) {
        width: 350px;
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        gap: 10px;
    }
`

export const EmptyDiv = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        gap: 10px;
    }
`

export const Img = styled.img`
    width: 200px;
    height: 80px;
    object-fit: cover;
`
