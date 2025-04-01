import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ACheckBoxGroupProps } from 'types/aCheckBoxGroup.type'
import {
    CheckBoxContainer,
    CheckBoxItem,
    RadioIcon,
} from './ACheckBoxGroup.styles'

const ACheckBoxGroup: React.FC<ACheckBoxGroupProps> = ({
    items,
    value = [],
    defaultValues = [],
    cols,
    w = '100%',
    p = '0px',
    designBorder = 'none',
    designBorderRight = '1px solid #ccd2e1',
    bg = '#ffffff',
    borderRight = 'none',
    disabled = false,
    showRadio = true,
    designAlign = 'center',
    onChange,
}) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(
        value || defaultValues.map(item => item.value),
    )
    useEffect(() => {
        setSelectedValues(value)
    }, [value])

    const flex = cols
        ? `0 0 calc((100% - ${cols - 1} * 2px) / ${cols})`
        : '1 1 0'

    const isLastInRow = (index: number) => {
        if (!cols) return false
        return (index + 1) % cols === 0
    }

    const isLastRowItem = (index: number) => {
        if (!cols) return false
        const totalRows = Math.ceil(items.length / cols)
        const lastRowStartIndex = (totalRows - 1) * cols
        return index >= lastRowStartIndex
    }

    const handleClick = (value: string) => {
        if (disabled) return

        const clickedItem = items.find(item => item.value === value)
        if (!clickedItem) return

        const isSelected = selectedValues.includes(value)
        const updatedValues = isSelected
            ? selectedValues.filter(item => item !== value)
            : [...selectedValues, value]

        setSelectedValues(updatedValues)

        const selectedItems = items.filter(item =>
            updatedValues.includes(item.value),
        )
        if (onChange) {
            onChange(selectedItems)
        }
    }

    return (
        <CheckBoxContainer w={w} designAlign={designAlign}>
            {items.map((item, index) => (
                <CheckBoxItem
                    key={item.value}
                    onClick={() => handleClick(item.value)}
                    designBorder={designBorder}
                    bg={bg}
                    flex={flex}
                    p={p}
                    designAlign={designAlign}
                    designBorderRight={designBorderRight}
                    borderRight={borderRight}
                    disabled={disabled}
                    isLastInRow={isLastInRow(index)}
                    isLastRowItem={isLastRowItem(index)}
                >
                    {selectedValues.includes(item.value) && (
                        <FontAwesomeIcon
                            style={{ color: '#5047c1', marginRight: '5px' }}
                            icon={faCheck}
                        />
                    )}
                    {showRadio && !selectedValues.includes(item.value) && (
                        <RadioIcon />
                    )}
                    <span>{item.text}</span>
                </CheckBoxItem>
            ))}
        </CheckBoxContainer>
    )
}

export default ACheckBoxGroup
