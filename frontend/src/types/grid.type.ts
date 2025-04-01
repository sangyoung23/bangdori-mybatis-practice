import { ColDef } from 'ag-grid-community'

export interface PropsType {
    items: unknown[]
    columns: ColDef[]
    height?: string
    selectMode?: 'singleRow' | 'multiRow'
    headerCheckbox?: boolean
    pagination?: boolean
    filter?: boolean
    editable?: boolean
    resizable?: boolean
    onselectionchange?: (row: unknown[]) => void
    onRowClick?: (row: unknown) => void
    onCellClick?: (colId: string) => void
}
