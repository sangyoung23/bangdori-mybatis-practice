import styled from '@emotion/styled'

export const SelectContainer = styled.div<{ mr?: string }>`
    position: relative;
    width: 150px;
    user-select: none;
    margin-right: ${props => props.mr || '0px'};
`

export const SelectButton = styled.div<{ isOpen: boolean }>`
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    &:hover {
        border-color: #999;
    }

    &::after {
        content: '';
        width: 6px;
        height: 6px;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        transform: ${({ isOpen }) =>
            isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
        margin-left: 8px;
        transition: transform 0.3s ease;
    }
`

export const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    min-width: 400px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-top: 7px;
    z-index: 1000;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`
