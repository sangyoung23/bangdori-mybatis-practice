import styled from '@emotion/styled'

export const CommDiv = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 2rem auto;
    padding: 0 40px;
    flex-wrap: nowrap;
    gap: 20px;

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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 180px);

    @media (min-width: 1024px) {
        flex-direction: row;
    }
`

export const Sidebar = styled.div`
    width: 100%;
    padding: 16px;
    overflow-y: auto;
    height: auto;

    @media (min-width: 1024px) {
        width: 360px;
        height: calc(100vh - 180px);
    }
`

export const MapWrapper = styled.div`
    flex: 1;
    min-height: 60vh;
    border-radius: 8px;
    margin-top: 16px;
    background-color: #f0f0f0;
    padding: 16px; /* 안쪽 여백 추가 */

    @media (max-width: 1024px) {
        min-height: 50vh;
    }

    @media (max-width: 768px) {
        min-height: 40vh;
        padding: 12px; /* 작은 화면에서 여백 줄이기 */
    }
`

export const PropertyInfoContainer = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;

    @media (max-width: 768px) {
        padding: 20px;
    }
`

export const PropertyHeader = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
`

export const TradeTypeBadge = styled.span`
    background-color: #ff6b6b;
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
`

export const TypeBadge = styled.span`
    background-color: #4caf50;
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
`

export const PropertyTitle = styled.h3`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
`

export const PropertyDetail = styled.p`
    font-size: 16px;
    color: #555;
    margin: 12px 0;

    strong {
        color: #333;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        font-size: 15px;
    }
`

export const BtnDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 12px; /* 버튼들 간 간격 설정 */

    @media (max-width: 768px) {
        align-items: stretch;
        justify-content: space-around;

        > * {
            margin-bottom: 10px;
            width: 50px;
        }
    }

    @media (min-width: 1024px) {
        justify-content: flex-start;
        gap: 10px;
    }
`

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 5px 0;
    margin-top: 10px;
    margin-bottom: 20px;
    max-width: 100%;
    flex-wrap: wrap;
    overflow: auto;
    max-height: 400px;

    @media (max-width: 768px) {
        flex-direction: column; /* 모바일에서는 세로 정렬 */
    }
`

export const ImageWrapper = styled.div`
    display: inline-block;
    height: 250px;
    width: 400px;
    margin-right: 12px;
    background-color: #ddd;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
`

export const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

// Card styles (no change)
export const Card = styled.div`
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease;
    width: 100%; /* 카드가 화면 크기에 맞게 조정되도록 설정 */

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    h3 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        color: #555;
        margin: 8px 0;
    }

    .highlight {
        color: #ff6b6b;
        font-weight: bold;
    }

    @media (max-width: 1024px) {
        padding: 12px;
    }

    @media (max-width: 768px) {
        padding: 10px;
    }
`
