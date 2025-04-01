import { useState } from 'react'
import { LoginFormData } from 'types/Login.type'

export const useLoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        id: '',
        password: '',
    })

    const handleInputChange =
        (field: keyof LoginFormData) => (value: string) => {
            setFormData(prev => ({
                ...prev,
                [field]: value,
            }))
        }

    return {
        formData,
        handleInputChange,
    }
}
