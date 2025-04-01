import styled from '@emotion/styled'

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

export const ModalContainer = styled.div`
    background-color: white;
    border-radius: 12px;
    width: 480px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`

export const ModalHeader = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
`

export const ModalTitle = styled.h2`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
`

export const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;

    &:hover {
        color: #111827;
        background-color: #f3f4f6;
    }
`

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 24px;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
`

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 0 24px 24px;
`
