import { ReactNode } from 'react'

export interface AModalProps {
    value: boolean
    title: string
    onClose: (close: boolean) => void
    onSave?: () => void
    children?: ReactNode
    showSaveBtn?: boolean
    modalH?: string
}
