import styled from '@emotion/styled'

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 200vh;

    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: center;
        padding: 0 20px;
    }

    @media (max-width: 768px) {
        padding: 16px 10px;
    }
`

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;

    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`

export const ContantWrap = styled.div`
    width: 80%;
    height: 100%;
    margin-top: 2%;

    @media (max-width: 1024px) {
        width: 90%;
        margin-top: 1%;
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 0;
        padding: 0 5px;
    }
`

export const Title = styled.h1`
    font-size: 23px;
    font-weight: 500;
    background-clip: text;
    -webkit-background-clip: text;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    width: 440%;

    @media (max-width: 1024px) {
        font-size: 20px;
        width: 100%;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    background-color: #fafafa;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 40px;
    position: relative;
    margin: 6% 0;

    @media (max-width: 1024px) {
        margin: 4% 0;
    }

    @media (max-width: 768px) {
        margin: 6% 0;
        font-size: 12px;
        width: 100%;
        table-layout: fixed;
    }
`

export const TableCaption = styled.caption`
    position: absolute;
    top: -35px;
    padding: 5px 10px;
    font-size: 16px;
    // font-weight: bold;
    color: #747474;
    border-radius: 5px;

    @media (max-width: 1024px) {
        font-size: 14px;
        top: -25px;
    }

    @media (max-width: 768px) {
        font-size: 12px;
        top: -20px;
    }
`

export const Cell = styled.td`
    width: 35%;
    height: 60px;
    text-align: center;
    background-color: #fff;
    color: #000;
    font-size: 14px;
    line-height: 2;
    padding: 1% 0.5%;
    border: 1px solid #e0e0e0;

    @media (max-width: 1024px) {
        height: 50px;
        font-size: 12px;
    }

    @media (max-width: 768px) {
        height: auto;
        font-size: 11px;
        padding: 10px 5px;
        display: block;
        width: 100%;
        box-sizing: border-box;
    }
`

export const CellInput = styled.td`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 60px;
    text-align: center;
    background-color: #fff;
    color: #000;
    font-size: 14px;
    line-height: 2;
    padding: 1% 0.5%;
    border: 1px solid #e0e0e0;

    @media (max-width: 1024px) {
        height: 50px;
        font-size: 12px;
    }

    @media (max-width: 768px) {
        height: auto;
        flex-direction: column;
        gap: 10px;
        padding: 10px 5px;
        font-size: 11px;
    }
    @media (max-width: 768px) {
        > div,
        > input {
            width: 100% !important;
            margin-bottom: 5px;
        }
    }
`

export const SpecialCell = styled(Cell)`
    width: 14%;
    background-color: #f9f9f9;
    vertical-align: middle;
    // font-weight: bold;

    @media (max-width: 768px) {
        width: 100%;
        text-align: left;
        padding: 10px;
        border-bottom: none;
    }
`

export const MapCell = styled(Cell)`
    width: 50%;
    background-color: #f9f9f9;
    vertical-align: middle;

    @media (max-width: 1024px) {
        width: 100%;
    }

    @media (max-width: 768px) {
        font-size: 11px;
        padding: 10px;
        text-align: left;
    }
`

export const BtnCell = styled(Cell)`
    text-align: start;
    padding-left: 10px;

    @media (max-width: 768px) {
        padding: 10px;
        text-align: left;
    }
`

export const ImgCell = styled(SpecialCell)`
    width: 6.5% !important;
    height: 200px !important;

    @media (max-width: 1024px) {
        width: 10% !important;
        height: 150px !important;
    }

    @media (max-width: 768px) {
        width: 100% !important;
        height: auto !important;
        padding: 10px;
    }
`

export const ImageContainer = styled.div`
    display: inline-flex;
    gap: 10px;
    width: 100%;
    padding: 5px 0;
    max-width: 100%;
    flex-direction: row;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 5px;
        justify-content: center;
    }
`

export const ImageWrapper = styled.div`
    display: inline-block;
    height: 100px;
    width: 100px;
    background-color: #ddd;
    border-radius: 5px;
    overflow: hidden;
    position: relative;

    @media (max-width: 1024px) {
        height: 80px;
        width: 80px;
    }

    @media (max-width: 768px) {
        height: 70px;
        width: 70px;
    }
`

export const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const RemoveButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: #ff0000;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 15px;
        height: 15px;
        font-size: 10px;
    }
`

export const JosoPopWrap = styled.div`
    width: 100%;
`
