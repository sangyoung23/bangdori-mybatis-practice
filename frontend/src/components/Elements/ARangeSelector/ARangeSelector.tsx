import React, { useState, useRef, useEffect } from 'react'
import {
    SelectContainer,
    SelectButton,
    Dropdown,
} from './ARangeSelector.styles'
import { RangeSelectorProps } from 'types/aRangeSelector.type'
import AInputRange from '../AInputRange/AInputRange'

const ARangeSelector: React.FC<RangeSelectorProps> = ({
    min,
    max,
    mr,
    step = 1,
    placeholder = '선택 해주세요.',
    onChange,
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

    const handleRangeChange = (newRange: { min: number; max: number }) => {
        onChange?.(newRange)
    }

    return (
        <SelectContainer ref={containerRef} mr={mr}>
            <SelectButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                {placeholder}
            </SelectButton>
            {isOpen && (
                <Dropdown>
                    <AInputRange
                        min={min}
                        max={max}
                        step={step}
                        onChange={handleRangeChange}
                    />
                </Dropdown>
            )}
        </SelectContainer>
    )
}

export default ARangeSelector
