import { SelectObjectType } from 'types/select'

export interface ACheckBoxGroupProps {
    items: SelectObjectType[]
    value: string[]
    defaultValues?: SelectObjectType[]
    cols?: number
    w?: string
    p?: string
    designBorder?: string
    designBorderRight?: string
    bg?: string
    borderRight?: string
    disabled?: boolean
    showRadio?: boolean
    designAlign?: string
    onChange?: (selectedItems: SelectObjectType[]) => void
}
