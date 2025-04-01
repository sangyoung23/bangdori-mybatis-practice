import { DataType } from 'types/home.type'

export const PLACEHOLDER_MAP = {
    PR001: '거래종류',
    PR002: '거래방식',
    PR003: '방수',
    PR004: '욕실수',
    PR005: '방향',
    PR006: '입주일',
    PR007: '상태',
    PR008: '추가옵션',
} as const

export const COMM_CODE_TYPES = [
    'PR001',
    'PR002',
    'PR003',
    'PR004',
    'PR005',
    'PR006',
    'PR007',
    'PR008',
] as const

export const COMM_CODE_MAP: Record<string, keyof DataType> = {
    PR001: 'type',
    PR002: 'tradeType',
    PR003: 'roomCd',
    PR004: 'bathCd',
    PR005: 'directionCd',
    PR006: 'moveInCd',
    PR007: 'rcmCd',
    PR008: 'remarkCd',
}
