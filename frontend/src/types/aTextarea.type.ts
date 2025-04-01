export interface ATextareaProps {
    width?: string
    value?: string
    iconType?: 'user' | 'password' | 'search' | 'name'
    rows?: number
    cols?: number
    onChange?: (value: string) => void
    placeholder?: string
    maxLength?: number
    mb?: string
    disabled?: boolean
    label?: string
}
