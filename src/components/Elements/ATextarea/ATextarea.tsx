import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ATextareaProps } from 'types/aTextarea.type'
import {
    TextareaWrapper,
    TextareaLabel,
    TextareaContainer,
    TextareaIcon,
    StyledTextarea,
} from './ATextarea.styles'

const ATextarea: React.FC<ATextareaProps> = ({
    width = '250px',
    value,
    iconType,
    onChange,
    placeholder = '여기에 내용을 입력하세요.',
    maxLength,
    disabled = false,
    mb,
    label = '',
    rows = 4,
    cols = 50,
}) => {
    const handleFocus = () => {
        if (disabled) return
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (disabled) return
        const parent = e.target.parentElement as HTMLElement
        parent.style.border = 'none'
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (disabled) return
        if (onChange) {
            onChange(e.target.value)
        }
    }

    const renderIcon = () => {
        switch (iconType) {
            case 'search':
                return (
                    <TextareaIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </TextareaIcon>
                )
            case 'user':
                return (
                    <TextareaIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faUser} />
                    </TextareaIcon>
                )
            case 'password':
                return (
                    <TextareaIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faLock} />
                    </TextareaIcon>
                )
            case 'name':
                return (
                    <TextareaIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faPerson} />
                    </TextareaIcon>
                )
            default:
                return null
        }
    }

    return (
        <TextareaWrapper width={width} mb={mb}>
            {label && <TextareaLabel>{label}</TextareaLabel>}
            <TextareaContainer disabled={disabled}>
                {renderIcon()}
                <StyledTextarea
                    value={value}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    disabled={disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    rows={rows}
                    cols={cols}
                />
            </TextareaContainer>
        </TextareaWrapper>
    )
}

export default ATextarea
