import styled from '@emotion/styled'

export const SelectContainer = styled.div<{ mr?: string }>`
    position: relative;
    width: 150px;
    user-select: none;
    margin-right: ${props => props.mr || '0px'};
`

export const SelectButton = styled.div`
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
        border-right: 1px solid #000000;
        border-bottom: 1px solid #000000;
        transform: rotate(45deg);
        margin-left: 8px;
        transition: transform 0.3s ease;
    }

    ${({ isOpen }: { isOpen: boolean }) =>
        isOpen &&
        `
        &::after {
            transform: rotate(-135deg);
        }
    `}
`

export const DropdownList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-top: 4px;
    max-height: 180px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

export const DropdownItem = styled.div`
    padding: 6px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;

    &:hover {
        background-color: #f5f5f5;
    }

    input[type='checkbox'] {
        width: 14px;
        height: 14px;
        cursor: pointer;
    }
`
