export interface AInputProps {
    width?: string
    value?: string
    iconType?: 'user' | 'password' | 'search' | 'name' | 'phone'
    type?: 'text' | 'password' | 'email'
    onChange?: (value: string) => void
    placeholder?: string
    maxLength?: number
    mb?: string
    disabled?: boolean
    label?: string
}
