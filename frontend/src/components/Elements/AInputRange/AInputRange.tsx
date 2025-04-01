import React, { useState } from 'react'
import { DualRangeProps } from 'types/aInputRange.type'
import {
    RangeContainer,
    Slider,
    Track,
    Highlight,
    LabelContainer,
} from './AInputRange.styles'

const AInputRange: React.FC<DualRangeProps> = ({
    min,
    max,
    step = 1,
    width,
    onChange,
}) => {
    const [minValue, setMinValue] = useState(min)
    const [maxValue, setMaxValue] = useState(max)

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxValue - step)
        setMinValue(value)
        onChange?.({ min: value, max: maxValue })
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minValue + step)
        setMaxValue(value)
        onChange?.({ min: minValue, max: value })
    }

    const calculateLeft = () => ((minValue - min) / (max - min)) * 100
    const calculateRight = () => 100 - ((maxValue - min) / (max - min)) * 100

    return (
        <div>
            <RangeContainer width={width}>
                <Track />
                <Highlight left={calculateLeft()} right={calculateRight()} />
                <Slider
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={handleMinChange}
                />
                <Slider
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onChange={handleMaxChange}
                />
            </RangeContainer>
            <LabelContainer width={width}>
                <span>최소 가격: {minValue.toLocaleString()}만원</span>
                <span>최대 가격: {maxValue.toLocaleString()}만원</span>
            </LabelContainer>
        </div>
    )
}

export default AInputRange
