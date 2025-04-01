import React, { useState, useRef, useEffect } from 'react'
import { SelectObjectType } from 'types/select'
import {
    SelectContainer,
    SelectButton,
    DropdownList,
    DropdownItem,
} from './ASelector.styles'

interface ASelectorProps {
    options: SelectObjectType[]
    onChange?: (option: SelectObjectType) => void
    placeholder?: string
    value?: string
}

const ASelector: React.FC<ASelectorProps> = ({
    options,
    onChange,
    placeholder = '선택해주세요',
    value,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const getDisplayText = () => {
        if (!value) return placeholder
        const selectedOption = options.find(opt => opt.value === value)
        return selectedOption ? selectedOption.text : placeholder
    }

    const handleSelect = (option: SelectObjectType) => {
        onChange?.(option)
        setIsOpen(false)
    }

    return (
        <SelectContainer ref={containerRef}>
            <SelectButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                {getDisplayText()}
            </SelectButton>

            {isOpen && (
                <DropdownList>
                    {options.map(option => (
                        <DropdownItem
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            style={{
                                backgroundColor:
                                    value === option.value
                                        ? '#f0f0f0'
                                        : 'transparent',
                            }}
                        >
                            {option.text}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </SelectContainer>
    )
}

export default ASelector
