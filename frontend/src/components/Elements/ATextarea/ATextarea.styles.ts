import styled from '@emotion/styled'

export const TextareaWrapper = styled.div<{ width?: string; mb?: string }>`
    display: flex;
    flex-direction: column;
    width: ${props => props.width || '250px'};
    margin-bottom: ${props => props.mb || '0px'};
`

export const TextareaLabel = styled.label`
    font-size: 14px;
    margin-bottom: 6px;
    color: gray;
    font-weight: 500;
`

export const TextareaContainer = styled.div<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 8px 12px;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
    opacity: ${props => (props.disabled ? 0.6 : 1)};
`

export const TextareaIcon = styled.div<{ disabled?: boolean }>`
    margin-right: 8px;
    color: ${props => (props.disabled ? '#aaa' : '#888')};
    font-size: 16px;
    opacity: ${props => (props.disabled ? 0.5 : 1)};
`

export const StyledTextarea = styled.textarea<{ disabled?: boolean }>`
    flex: 1;
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 14px;
    color: ${props => (props.disabled ? '#999' : '#0c0707')};
    resize: none;
    height: auto;
    min-height: 80px;
`
