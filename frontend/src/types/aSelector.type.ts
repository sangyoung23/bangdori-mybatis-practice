import { SelectObjectType } from './select'

export interface ASelectorProps {
    options: SelectObjectType[]
    onChange?: (option: SelectObjectType) => void
    placeholder?: string
    value?: string
}
