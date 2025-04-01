import { useState } from 'react'
import { useAxios } from 'api/Axios'
import { useSession } from 'api/Session'
import { useAlert } from 'components/Elements/Alert/Alert'
import { useNavigate } from 'react-router-dom'
import { DataType } from 'types/home.type'

// 선택 항목 및 액션 관리 부분
export const useProductActions = (selectProduct: () => void) => {
    const [phoneNo1, setPhoneNo1] = useState('')
    const [phoneNo2, setPhoneNo2] = useState('')
    const [selectedItem, setSelectedItem] = useState<DataType[]>([])

    const { post } = useAxios()
    const { getSession } = useSession()
    const navigate = useNavigate()

    const { open } = useAlert({
        icon: 'error',
        title: '알림',
        text: '선택된 매물이 없습니다.',
    })
    const { open: moreSelectedItem } = useAlert({
        icon: 'error',
        title: '알림',
        text: '하나의 매물만 선택 해주세요.',
    })
    const { open: successUpdate } = useAlert({
        icon: 'success',
        title: '알림',
        text: '최신일자 변경이 완료되었습니다.',
    })
    const { open: successDelete } = useAlert({
        icon: 'success',
        title: '알림',
        text: '삭제가 완료되었습니다.',
    })

    const handleSelectionCheckBox = (item: unknown[]) => {
        const row = item as DataType[]
        setSelectedItem(row)
    }

    const handleRowClick = (items: unknown) => {
        const data = items as DataType
        if (data.phoneNo1) setPhoneNo1(data.phoneNo1)
        if (data.phoneNo2) setPhoneNo2(data.phoneNo2)
    }

    const handleCellClick = (colId: string) => {
        const extractNumbers = (phoneNumber: string) => {
            return phoneNumber.replace(/[^0-9]/g, '')
        }

        if (colId === 'phoneNo1' && phoneNo1) {
            const cleanedPhoneNo1 = extractNumbers(phoneNo1)
            window.location.href = `tel:${cleanedPhoneNo1}`
        }
        if (colId === 'phoneNo2' && phoneNo2) {
            const cleanedPhoneNo2 = extractNumbers(phoneNo2)
            window.location.href = `tel:${cleanedPhoneNo2}`
        }
    }

    const handleCrrection = () => {
        if (selectedItem.length === 0) {
            open()
            return
        }
        if (selectedItem.length > 1) {
            moreSelectedItem()
            return
        }

        const itemToUpdate = { ...selectedItem[0], chgResn: 'U' }
        const navigatePath = {
            '10': '/product/registration',
            '20': '/product/registration',
            '30': '/product/registration',
            '40': '/product/registration',
            '50': '/bargain/registration',
            '60': '/rent/registration',
        }[selectedItem[0].tradeType]

        if (navigatePath) {
            navigate(navigatePath, { state: { item: itemToUpdate } })
        }
    }

    const handleCopy = () => {
        if (selectedItem.length === 0) {
            open()
            return
        }
        if (selectedItem.length > 1) {
            moreSelectedItem()
            return
        }

        const itemToCopy = { ...selectedItem[0], chgResn: 'C' }
        const navigatePath = {
            '10': '/product/registration',
            '20': '/product/registration',
            '30': '/product/registration',
            '40': '/product/registration',
            '50': '/bargain/registration',
            '60': '/rent/registration',
        }[selectedItem[0].type]

        if (navigatePath) {
            navigate(navigatePath, { state: { item: itemToCopy } })
        }
    }

    const handleUpdateNewDtm = async () => {
        if (selectedItem.length === 0) {
            open()
            return
        }

        try {
            await Promise.all(
                selectedItem.map(item =>
                    post<void>('/api/product/updateNewDtm', {
                        prodNo: item.prodNo,
                        userNo: getSession('userNo'),
                    }),
                ),
            )
            successUpdate(() => {
                selectProduct()
            })
        } catch (error) {
            console.error('Error updating new DTM:', error)
        }
    }

    const handleDeleteProd = async () => {
        if (selectedItem.length === 0) {
            open()
            return
        }

        try {
            await Promise.all(
                selectedItem.map(item =>
                    post<void>('/api/product/deleteProduct', {
                        prodNo: item.prodNo,
                    }),
                ),
            )
            successDelete(() => {
                selectProduct()
            })
        } catch (error) {
            console.error('Error deleting products:', error)
        }
    }

    return {
        handleSelectionCheckBox,
        handleRowClick,
        handleCellClick,
        handleCrrection,
        handleCopy,
        handleUpdateNewDtm,
        handleDeleteProd,
    }
}
