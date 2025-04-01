import styled from '@emotion/styled'

export const Button = styled.button<{
    btnType?: string
    mr?: string
    width?: string
}>`
    position: relative;
    border: none;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 20px;
    width: ${props => props.width || '100px'};
    margin-right: ${props => props.mr || '0px'};
    border-radius: 8px;
    border: 1px solid #5245cfde;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 12px;
    transition: 0.25s;
    color: #000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
`
