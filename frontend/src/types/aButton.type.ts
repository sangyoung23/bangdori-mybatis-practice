import { ReactNode } from 'react'

export interface AButtonPropsType {
    type?: 'button' | 'submit'
    children?: ReactNode
    disabled?: boolean
    mr?: string
    width?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
