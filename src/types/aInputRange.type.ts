export interface RangeContainerProps {
    width?: string
}

export interface DualRangeProps {
    min: number
    max: number
    step?: number
    width?: string
    onChange?: (range: { min: number; max: number }) => void
}
