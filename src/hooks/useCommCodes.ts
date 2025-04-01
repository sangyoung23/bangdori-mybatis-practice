import { useAxios } from 'api/Axios'
import { useSession } from 'api/Session'
import { useEffect, useState } from 'react'
import { CommCodesType } from 'types/commCodes.type'
import { SelectObjectType } from 'types/select'
import { COMM_CODE_TYPES } from 'constants/constants'

const mapCommCodeToSelectOptions = (
    codeList: CommCodesType[],
): SelectObjectType[] =>
    codeList.map(item => ({
        text: item.cdNm,
        value: item.dtlCd,
    }))

// 공통 코드 데이터 관리 부분
export const useCommCodes = (selectProduct: () => void) => {
    const [codeItems, setCodeItems] = useState<
        Record<string, SelectObjectType[]>
    >({})

    const { get } = useAxios()
    const { setSession, getSession } = useSession()

    useEffect(() => {
        async function getCommCode() {
            const response = await get<CommCodesType>(
                '/api/comm/code/commCodes',
            )
            selectProduct()

            if (response.valid && response.result) {
                setSession('commCodes', response.result.LIST)
                const processedCodeItems = COMM_CODE_TYPES.reduce(
                    (acc, codeType) => {
                        acc[codeType] = mapCommCodeToSelectOptions(
                            getSession('commCodes')[codeType].slice(1),
                        )
                        return acc
                    },
                    {} as Record<string, SelectObjectType[]>,
                )
                setCodeItems(processedCodeItems)
            }
        }
        getCommCode()
    }, [])

    return { codeItems }
}
