// 날짜 2024-10-10 형식 포매터
export const formatDate = (dateString: string) => {
    if (!dateString) return '날짜 정보 없음'
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// 전화번호 포매터
export const formatPhoneNumber = (phone: string) => {
    if (!phone) return '정보 없음'
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}

// Date 타입 포매터
export const formatDatePicker = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0') // 일자 두 자리로 포맷팅
    return `${year}${month}${day}`
}

// 보증금/월세 포매터
export const formatDepositAndRent = (value: string) => {
    if (!value) return ''

    // 숫자 부분에 3자리 콤마 추가하는 함수
    const formatNumber = (num: string) => {
        const numericValue = parseInt(num.replace(/[^\d]/g, ''), 10) // 숫자만 추출
        return isNaN(numericValue) ? num : numericValue.toLocaleString() // 콤마 추가
    }

    // 숫자와 텍스트를 분리해서 처리
    const formattedValue = value.replace(/\d+/g, match => formatNumber(match))

    return formattedValue
}
