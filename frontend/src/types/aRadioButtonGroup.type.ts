import { SelectObjectType } from './select'

export interface ARadioButtonGroupProps {
    items: SelectObjectType[]
    value?: string
    defaultValue?: SelectObjectType
    cols?: number
    w?: string
    p?: string
    designBorder?: string
    designBorderRight?: string
    bg?: string
    borderRight?: string
    disabled?: boolean
    designAlign?: string
    fontSize?: string
    onChange?: (selectedItem: SelectObjectType) => void
}
