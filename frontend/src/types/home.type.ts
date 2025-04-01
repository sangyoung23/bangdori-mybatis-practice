import { SelectObjectType } from './select'

export interface DataType {
    bathCd: string
    deposit: string
    depositTotal: string
    directionCd: string
    entrancePwd: string
    etc: string
    monthlyRent: string
    depositAndMonthlyRent: string
    salePricdAndDepoAndRent: string
    depositAndMonthlyRentAndPreFee: string
    moveInCd: string
    phoneNo1: string
    phoneNo2: string
    premiumFee: string
    premiumYn: string
    prodAddr: string
    propertyX: string
    propertyY: string
    prodDtlAddr: string
    prodNo: string
    prodRoadAddr: string
    rcmCd: string
    rentTotal: string
    roomCd: string
    salePrice: string
    title: string
    tradeType: string
    type: string
    unitNo: string
    unitPwd: string
    [key: string]: string
}

export interface HeaderSectionProps {
    mobileSize: boolean
    handleInputChange: (value: string) => void
}

export interface FilterSectionProps {
    handleRangeChange: (
        type: 'deposit' | 'monthlyRent',
        range: { min: number; max: number },
    ) => void
    codeItems: Record<string, SelectObjectType[]>
    handleChangeSelector: (key: string, selectedItems: string[]) => void
}

export interface ButtonSectionProps {
    handleCrrection: () => void
    handleCopy: () => void
    handleUpdateNewDtm: () => void
    handleDeleteProd: () => void
}
