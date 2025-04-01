import styled from '@emotion/styled'

export const RadioButtonContainer = styled.div<{
    w?: string
    designAlign?: string
}>`
    width: ${({ w }) => w || '100%'};
    display: flex;
    flex-wrap: wrap;
    gap: 3px 2px;
    text-align: ${({ designAlign }) => designAlign || 'center'};
    border-radius: 3px;
    box-sizing: border-box;
    user-select: none;
`

export const RadioButtonItem = styled.div<{
    designBorder?: string
    bg?: string
    flex: string
    p?: string
    designAlign?: string
    designBorderRight?: string
    borderRight?: string
    disabled?: boolean
    fontSize?: string
}>`
    border: ${({ designBorder }) => designBorder || 'none'};
    background: ${({ bg }) => bg || '#ffffff'};
    flex: ${({ flex }) => flex};
    padding: ${({ p }) => p || '0px'};
    display: flex;
    justify-content: ${({ designAlign }) => designAlign || 'center'};
    align-items: center;
    border-right: ${({ designBorderRight }) =>
        designBorderRight || '1px solid #ccd2e1'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
    font-size: ${({ fontSize }) => fontSize || '1rem'};
    color: #000;

    &:last-child {
        border-right: ${({ borderRight }) => borderRight || 'none'};
    }
`

export const RadioIcon = styled.span<{ selected?: boolean }>`
    width: 13px;
    height: 13px;
    border: 1px solid gray;
    border-radius: 50%;
    background-color: ${({ selected }) => (selected ? '#5047c1' : '#ffffff')};
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: ${({ selected }) =>
            selected ? '#ffffff' : 'transparent'};
    }
`
