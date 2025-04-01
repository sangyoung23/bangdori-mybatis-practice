import React, { useState, useRef, useEffect } from 'react'
import { MultiSelectProps } from 'types/aCheckSelector'
import {
    SelectContainer,
    SelectButton,
    DropdownList,
    DropdownItem,
} from './ACheckSelector.styles'

const ACheckSelector: React.FC<MultiSelectProps> = ({
    options,
    onChange,
    placeholder = '선택해주세요',
    mr,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
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

    const toggleOption = (value: string) => {
        const newSelectedItems = selectedItems.includes(value)
            ? selectedItems.filter(item => item !== value)
            : [...selectedItems, value]

        setSelectedItems(newSelectedItems)
        onChange?.(newSelectedItems)
    }

    const getDisplayText = () => {
        if (selectedItems.length === 0) return placeholder
        if (selectedItems.length === 1) {
            return options.find(opt => opt.value === selectedItems[0])?.text
        }
        return `${selectedItems.length}개 선택됨`
    }

    return (
        <SelectContainer ref={containerRef} mr={mr}>
            <SelectButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                {getDisplayText()}
            </SelectButton>

            {isOpen && (
                <DropdownList>
                    {options.map(option => (
                        <DropdownItem
                            key={option.value}
                            onClick={() => toggleOption(option.value)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(option.value)}
                                onChange={() => toggleOption(option.value)}
                            />
                            {option.text}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </SelectContainer>
    )
}

export default ACheckSelector
