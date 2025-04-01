import React, { useEffect, useState } from 'react'
import { ARadioButtonGroupProps } from 'types/aRadioButtonGroup.type'
import {
    RadioButtonContainer,
    RadioButtonItem,
    RadioIcon,
} from './ARadioButtonGroup.styles'

const ARadioButtonGroup: React.FC<ARadioButtonGroupProps> = ({
    items,
    value,
    defaultValue,
    cols,
    w = '100%',
    p = '0px',
    designBorder = 'none',
    designBorderRight = '1px solid #ccd2e1',
    bg = '#ffffff',
    borderRight = 'none',
    disabled = false,
    designAlign = 'center',
    fontSize = '1rem',
    onChange,
}) => {
    const [selectedValue, setSelectedValue] = useState<string | null>()

    useEffect(() => {
        if (value) {
            setSelectedValue(value)
        } else if (defaultValue) {
            setSelectedValue(defaultValue.value)
        }
    }, [value, defaultValue])
    const flex = cols
        ? `0 0 calc((100% - ${cols - 1} * 2px) / ${cols})`
        : '1 1 0'

    const handleClick = (value: string) => {
        if (disabled) return

        const clickedItem = items.find(item => item.value === value)
        if (!clickedItem) return

        setSelectedValue(clickedItem.value)
        if (onChange) {
            onChange(clickedItem)
        }
    }
    return (
        <RadioButtonContainer w={w} designAlign={designAlign}>
            {items.map(item => (
                <RadioButtonItem
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
                    fontSize={fontSize}
                >
                    <RadioIcon selected={selectedValue === item.value} />
                    <span>{item.text}</span>
                </RadioButtonItem>
            ))}
        </RadioButtonContainer>
    )
}

export default ARadioButtonGroup
