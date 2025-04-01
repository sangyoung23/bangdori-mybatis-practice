import React from 'react'
import { useUiStateStore } from 'store/UiState'
import Spinner from 'react-bootstrap/Spinner'

const Loader = () => {
    const isLoading = useUiStateStore(state => state.isLoading)

    if (!isLoading) return null

    const overlayStyle = {
        position: 'fixed' as const,
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const spinnerStyle = {
        width: '3rem',
        height: '3rem',
    }

    return (
        <div style={overlayStyle}>
            <Spinner animation="border" variant="light" style={spinnerStyle} />
        </div>
    )
}

export default Loader
