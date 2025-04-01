export interface RangeSelectorProps {
    min: number
    max: number
    mr?: string
    step?: number
    placeholder?: string
    onChange?: (range: { min: number; max: number }) => void
}
