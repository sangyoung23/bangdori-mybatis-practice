import styled from '@emotion/styled'

export const CheckBoxContainer = styled.div<{
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

export const CheckBoxItem = styled.div<{
    designBorder?: string
    bg?: string
    flex: string
    p?: string
    designAlign?: string
    designBorderRight?: string
    borderRight?: string
    disabled?: boolean
    isLastInRow?: boolean // 추가: 마지막 항목 여부
    isLastRowItem?: boolean // 추가: 마지막 행의 항목 여부
}>`
    border: ${({ designBorder }) => designBorder || 'none'};
    background: ${({ bg }) => bg || '#ffffff'};
    flex: ${({ flex }) => flex};
    padding: ${({ p }) => p || '0px'};
    display: flex;
    justify-content: ${({ designAlign }) => designAlign || 'center'};
    align-items: center;
    border-right: ${({ isLastInRow, isLastRowItem, designBorderRight }) =>
        isLastInRow && !isLastRowItem
            ? 'none'
            : designBorderRight || '1px solid #ccd2e1'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
    font-size: 15px;
    color: #000;
`

export const RadioIcon = styled.span`
    width: 13px;
    height: 13px;
    border: 1px solid gray;
    border-radius: 50%;
    background-color: #ffffff;
    margin-right: 5px;
`
