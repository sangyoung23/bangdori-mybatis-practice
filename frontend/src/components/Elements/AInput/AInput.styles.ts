import styled from '@emotion/styled'

export const InputWrapper = styled.div<{ width?: string; mb?: string }>`
    display: flex;
    flex-direction: column;
    width: ${props => props.width || '250px'};
    margin-bottom: ${props => props.mb || '0px'};
`

export const InputLabel = styled.label`
    font-size: 14px;
    margin-bottom: 6px;
    color: gray;
    font-weight: 500;
`

export const InputContainer = styled.div<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    background-color: ${props => (props.disabled ? '#f0f0f0' : '#f7f7fa')};
    border-radius: 10px;
    padding: 8px 12px;
    box-shadow: ${props =>
        props.disabled
            ? '0 1px 2px rgba(0, 0, 0, 0.05)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)'};
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
    opacity: ${props => (props.disabled ? 0.6 : 1)};
`

export const InputIcon = styled.div<{ disabled?: boolean }>`
    margin-right: 8px;
    color: ${props => (props.disabled ? '#aaa' : '#888')};
    font-size: 16px;
    opacity: ${props => (props.disabled ? 0.5 : 1)};
`

export const StyledInput = styled.input<{ disabled?: boolean }>`
    flex: 1;
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 14px;
    height: 28px;
    color: ${props => (props.disabled ? '#000000' : '#0c0707')};
    transition: color 0.3s ease;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'text')};
`
