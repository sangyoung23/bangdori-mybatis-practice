import { SelectObjectType } from 'types/select'

export interface MultiSelectProps {
    options: SelectObjectType[]
    onChange?: (selectedItems: string[]) => void
    placeholder?: string
    mr?: string
}
