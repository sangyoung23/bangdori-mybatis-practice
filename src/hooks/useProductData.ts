import { useAxios } from 'api/Axios'
import { useState, useEffect } from 'react'
import { DataType } from 'types/home.type'
import { COMM_CODE_MAP } from 'constants/constants'

// 데이터 조회 및 관리 부분
export const useProductData = () => {
    const [rowData, setRowData] = useState<DataType[]>([])
    const [filteredData, setFilteredData] = useState<DataType[]>([])
    const [filters, setFilters] = useState<Record<string, string[]>>({})
    const [searchText, setSearchText] = useState('')
    const [rangeFilter, setRangeFilter] = useState({
        deposit: { min: 0, max: 99999 },
        monthlyRent: { min: 0, max: 99999 },
    })

    const { get } = useAxios()

    useEffect(() => {
        const filteredData = rowData.filter(item => {
            const deposit = item.deposit ? Number(item.deposit) : 0
            const rent = item.monthlyRent ? Number(item.monthlyRent) : 0

            const isWithinDepositRange =
                deposit >= rangeFilter.deposit.min &&
                deposit <= rangeFilter.deposit.max
            const isWithinRentRange =
                rent >= rangeFilter.monthlyRent.min &&
                rent <= rangeFilter.monthlyRent.max
            const matchesSearchText = searchText
                ? Object.values(item).some(value =>
                      value
                          ?.toString()
                          .toLowerCase()
                          .includes(searchText.toLowerCase()),
                  )
                : true

            return (
                Object.entries(filters).every(([key, selectedValues]) => {
                    const mappedKey = COMM_CODE_MAP[key]
                    const itemValue = item[mappedKey]
                    if (key === 'PR008') {
                        return (
                            selectedValues.length === 0 ||
                            selectedValues.some(value =>
                                itemValue.includes(value),
                            )
                        )
                    }
                    return (
                        selectedValues.length === 0 ||
                        selectedValues.includes(itemValue)
                    )
                }) &&
                isWithinDepositRange &&
                isWithinRentRange &&
                matchesSearchText
            )
        })
        setFilteredData(filteredData)
    }, [filters, rangeFilter, rowData, searchText])

    const selectProduct = async () => {
        const res = await get<DataType>('/api/product/products')
        if (res.valid && res.result) {
            setRowData(res.result.LIST)
        }
    }

    const handleChangeSelector = (key: string, selectedItems: string[]) => {
        setFilters(prev => ({ ...prev, [key]: selectedItems }))
    }

    const handleRangeChange = (
        type: 'deposit' | 'monthlyRent',
        range: { min: number; max: number },
    ) => {
        setRangeFilter(prev => ({ ...prev, [type]: range }))
    }

    const handleInputChange = (value: string) => {
        setSearchText(value)
    }

    return {
        selectProduct,
        handleChangeSelector,
        handleRangeChange,
        handleInputChange,
        filteredData,
    }
}
