import styled from '@emotion/styled'
import { RangeContainerProps } from 'types/aInputRange.type'

export const RangeContainer = styled.div<RangeContainerProps>`
    width: ${({ width }) => width || '100%'};
    position: relative;
    padding: 10px 0;
`

export const Slider = styled.input`
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;

    &::-webkit-slider-thumb {
        width: 16px;
        height: 16px;
        background-color: #007bff;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        z-index: 3;
        border: 2px solid white;
        transition: transform 0.2s ease;
    }

    &::-webkit-slider-thumb:hover {
        transform: scale(1.2);
    }

    &::-webkit-slider-thumb::before {
        content: '';
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: transparent;
        border-radius: 50%;
        z-index: -1;
    }
`

export const Track = styled.div`
    position: absolute;
    width: 100%;
    height: 4px;
    background: #ddd;
    border-radius: 5px;
`

export const Highlight = styled.div<{ left: number; right: number }>`
    position: absolute;
    height: 4px;
    background-color: #007bff;
    border-radius: 5px;
    left: ${({ left }) => `${left}%`};
    right: ${({ right }) => `${right}%`};
`

export const LabelContainer = styled.div<RangeContainerProps>`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    color: #555;
    width: ${({ width }) => width || '300px'};
`
