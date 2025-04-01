import styled from '@emotion/styled'

export const Wrapper = styled.div<{ width?: string }>`
    display: flex;
    align-items: center;
    position: relative;
    width: ${({ width }) => width || '240px'};
`

export const IconContainer = styled.div`
    position: absolute;
    right: 12px;
    color: #333;
    pointer-events: none;
    font-size: 18px;
`
