import { useState, useEffect } from 'react'
import { ColDef } from 'ag-grid-community'
import { formatDepositAndRent, formatPhoneNumber } from 'utils/Formatter'

// 레이아웃/반응형 관리 부분
export const useResponsive = () => {
    const [mobileSize, setMobileSize] = useState(false)
    const [headers, setHeaders] = useState<ColDef[]>([])

    const [defaultHeaders] = useState<ColDef[]>([
        {
            field: 'prodNo',
            headerName: '매물번호',
            width: 100,
        },
        {
            field: 'title',
            headerName: '매물명',
            width: 350,
        },
        {
            field: 'unitNo',
            headerName: '호수',
            width: 100,
        },
        {
            field: 'depositAndMonthlyRent',
            headerName: '보증금/월세',
            width: 400,
            valueGetter: params => {
                const tradeType = params.data.tradeType
                const item = params.data
                if (['10', '20', '30', '40'].includes(tradeType)) {
                    return formatDepositAndRent(item.depositAndMonthlyRent)
                } else if (tradeType === '50') {
                    return formatDepositAndRent(item.salePricdAndDepoAndRent)
                } else if (tradeType === '60') {
                    return formatDepositAndRent(
                        item.depositAndMonthlyRentAndPreFee,
                    )
                }
                return ''
            },
        },
        {
            field: 'entrancePwd',
            headerName: '비밀번호(세대)',
            width: 200,
        },
        {
            field: 'unitPwd',
            headerName: '비밀번호(현관)',
            width: 200,
        },
        {
            field: 'prodAddr',
            headerName: '주소',
            width: 350,
        },
        {
            field: 'phoneNo1',
            headerName: '연락처1',
            width: 250,
            valueFormatter: params => {
                const phoneNumber = params.value
                if (!phoneNumber) return ''
                const cleaned = phoneNumber.replace(/[^\d]/g, '')
                if (cleaned.length === 10) {
                    return formatPhoneNumber(cleaned)
                } else if (cleaned.length === 11) {
                    return formatPhoneNumber(cleaned)
                }
                return phoneNumber
            },
        },
        {
            field: 'phoneNo2',
            headerName: '연락처2',
            width: 250,
            valueFormatter: params => {
                const phoneNumber = params.value
                if (!phoneNumber) return ''
                const cleaned = phoneNumber.replace(/[^\d]/g, '')
                if (cleaned.length === 10) {
                    return formatPhoneNumber(cleaned)
                } else if (cleaned.length === 11) {
                    return formatPhoneNumber(cleaned)
                }
                return phoneNumber
            },
        },
        {
            field: 'etc',
            headerName: '기타정보',
            width: 340,
        },
    ])

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768
            const filteredHeaders = defaultHeaders.filter(header =>
                isMobile
                    ? header.field !== 'etc' && header.field !== 'prodNo'
                    : true,
            )
            setHeaders(filteredHeaders)
            setMobileSize(isMobile)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [defaultHeaders])

    return {
        mobileSize,
        headers,
    }
}
