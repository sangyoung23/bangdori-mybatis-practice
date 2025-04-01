import React, { useState, useEffect } from 'react'
import AButton from 'components/Elements/AButton/AButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { AModalProps } from 'types/aModal.type'
import {
    ModalOverlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalContent,
    ButtonGroup,
} from './AModal.styles'

const AModal: React.FC<AModalProps> = ({
    value,
    title,
    onClose,
    onSave,
    children,
    showSaveBtn = false,
    modalH,
}) => {
    const [isOpen, setIsOpen] = useState(value)

    useEffect(() => {
        setIsOpen(value)

        if (value) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [value])

    const closeModal = () => {
        onClose(false)
    }

    const handleSave = () => {
        if (onSave) {
            onSave()
        }
    }

    return (
        <>
            {isOpen && (
                <ModalOverlay>
                    <ModalContainer
                        style={{ height: modalH ? modalH : 'auto' }}
                    >
                        <ModalHeader>
                            <ModalTitle>{title}</ModalTitle>
                            <CloseButton onClick={closeModal}>
                                <FontAwesomeIcon icon={faXmark} />
                            </CloseButton>
                        </ModalHeader>
                        <ModalContent>{children}</ModalContent>
                        <ButtonGroup>
                            {!showSaveBtn && (
                                <AButton onClick={handleSave}>저장</AButton>
                            )}
                            <AButton onClick={closeModal}>닫기</AButton>
                        </ButtonGroup>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </>
    )
}

export default AModal
