import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faMobile,
    faLock,
    faPerson,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { AInputProps } from 'types/aInput.type'
import {
    InputWrapper,
    InputLabel,
    InputContainer,
    InputIcon,
    StyledInput,
} from './AInput.styles'

const AInput: React.FC<AInputProps> = ({
    width = '250px',
    value,
    iconType,
    onChange,
    type = 'text',
    placeholder = '검색어를 입력하세요.',
    maxLength,
    disabled = false,
    mb,
    label = '',
}) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (disabled) return
        const parent = e.target.parentElement as HTMLElement
        parent.style.boxShadow = '0 4px 8px rgba(0, 123, 255, 0.3)'
        parent.style.border = '1px solid #007bff'
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (disabled) return
        const parent = e.target.parentElement as HTMLElement
        parent.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
        parent.style.border = 'none'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return
        if (onChange) {
            onChange(e.target.value)
        }
    }

    const renderIcon = () => {
        switch (iconType) {
            case 'search':
                return (
                    <InputIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </InputIcon>
                )
            case 'user':
                return (
                    <InputIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faUser} />
                    </InputIcon>
                )
            case 'password':
                return (
                    <InputIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faLock} />
                    </InputIcon>
                )
            case 'name':
                return (
                    <InputIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faPerson} />
                    </InputIcon>
                )
            case 'phone':
                return (
                    <InputIcon disabled={disabled}>
                        <FontAwesomeIcon icon={faMobile} />
                    </InputIcon>
                )
            default:
                return null
        }
    }

    return (
        <InputWrapper width={width} mb={mb}>
            {label && <InputLabel>{label}</InputLabel>}
            <InputContainer disabled={disabled}>
                {renderIcon()}
                <StyledInput
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    disabled={disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </InputContainer>
        </InputWrapper>
    )
}

export default AInput
