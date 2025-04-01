import React, { ChangeEvent, useState, useEffect } from 'react'
import { useAxios } from 'api/Axios'
import { useSession } from 'api/Session'
import Header from 'components/Elements/Header/Header'
import AInput from 'components/Elements/AInput/AInput'
import ACheckBoxGroup from 'components/Elements/ACheckBoxGroup/ACheckBoxGroup'
import ASelector from 'components/Elements/ASelector/ASelector'
import AButton from 'components/Elements/AButton/AButton'
import ARadioButtonGroup from 'components/Elements/ARadioButtonGroup/ARadioButtonGroup'
import ATextarea from 'components/Elements/ATextarea/ATextarea'
import { SelectObjectType } from 'types/select'
import Loader from 'components/Elements/Loader/Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAlert } from 'components/Elements/Alert/Alert'
import Post from 'components/Elements/Utill/Post'
import {
    Wrapper,
    TitleWrapper,
    ContantWrap,
    Title,
    Table,
    TableCaption,
    Cell,
    CellInput,
    SpecialCell,
    MapCell,
    BtnCell,
    ImgCell,
    ImageContainer,
    ImageWrapper,
    ImagePreview,
    RemoveButton,
    JosoPopWrap,
} from './ProdRegistration.styles'
import { CommCodesType } from 'types/commCodes.type'
import { ProdValues } from 'types/prodRegistration.type'
import { SelectType } from 'types/SelectType'

const mapCommCodeToSelectOptions = (
    codeList: CommCodesType[],
): SelectObjectType[] =>
    codeList.map(item => ({
        text: item.cdNm,
        value: item.dtlCd,
    }))

const COMM_CODE_TYPES = [
    'PR001',
    'PR002',
    'PR003',
    'PR004',
    'PR005',
    'PR006',
    'PR007',
    'PR008',
] as const

const ProdRegistration = () => {
    const [flag, setFlag] = useState(false)
    const [codeItems, setCodeItems] = useState<
        Record<string, SelectObjectType[]>
    >({})
    const [mode, setMode] = useState('')

    const location = useLocation()
    const { getSession } = useSession()
    const navigate = useNavigate()
    const { get } = useAxios()
    const { post } = useAxios()
    const { postFormData } = useAxios()

    const [prevProdNo, setPrevProdNo] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [serverFiles, setServerFiles] = useState<string[]>([])
    const [adminOptions, setAdminOptions] = useState<SelectType[]>([])
    const [prodValues, setProdValues] = useState<ProdValues>({
        prodMngUser: '',
        direction: '', //방향
        rcm: '', //추천
        room: '', //방갯수
        bath: '', //욕실 수
        type: '', //거래종류
        tradeType: '', //거래방식
        title: '', //메물명
        unitNo: '', //세대호수
        entrancePwd: '', //현관비번
        unitPwd: '', //세대비번
        phonNo1: '', //연락처1
        phonNo2: '', //연락처2
        deposit: '', //보증금
        monthlyRent: '', //월세
        moveIn: '', //입주정보
        remarks: [], // remarks는 빈 배열로 초기화
        prodRoadAddr: '', //도로명주소
        prodAddr: '', //지번주소
        etc: '', //기타
        propertyX: '', // 위도
        propertyY: '', // 경도
    })

    async function getImgsrcByProdNo(prodNo: number) {
        const response = await get<string>('/api/product/getImgsrcByProdNo', [
            { key: 'prodNo', value: String(prodNo) },
        ])

        if (response.valid && response.result) {
            const images: string[] = response.result.LIST
            setServerFiles(images)
        }
    }
    useEffect(() => {
        if (location.state) {
            const {
                chgResn,
                bathCd,
                deposit,
                directionCd,
                entrancePwd,
                etc,
                monthlyRent,
                moveInCd,
                phoneNo1,
                phoneNo2,
                prodAddr,
                prodNo,
                prodRoadAddr,
                rcmCd,
                remarkCd,
                roomCd,
                title,
                tradeType,
                type,
                unitNo,
                unitPwd,
                prodMngUser,
                propertyX,
                propertyY,
            } = location.state.item

            setProdValues(prevState => ({
                ...prevState,
                type: type || '',
                tradeType: tradeType || '',
                title: title || '',
                unitNo: unitNo || '',
                entrancePwd: entrancePwd || '',
                unitPwd: unitPwd || '',
                phonNo1: phoneNo1 || '',
                phonNo2: phoneNo2 || '',
                deposit: deposit || '',
                monthlyRent: monthlyRent || '',
                moveIn: moveInCd || '',
                prodRoadAddr: prodRoadAddr || '',
                prodAddr: prodAddr || '',
                etc: etc || '',
                remarks: remarkCd || [],
                direction: directionCd || '',
                rcm: rcmCd || '',
                room: roomCd || '',
                bath: bathCd || '',
                prodMngUser: prodMngUser || '',
                propertyX: propertyX || '',
                propertyY: propertyY || '',
            }))

            //수정/복사 코드 세팅
            setMode(chgResn)

            setPrevProdNo(prodNo)

            // 사진 경로 가져오기
            if (chgResn === 'U') {
                getImgsrcByProdNo(prodNo)
            }
        }
    }, [location.state])

    useEffect(() => {
        async function getCommCode() {
            const commCodes = getSession('commCodes')

            const processedCodeItems = COMM_CODE_TYPES.reduce(
                (acc, codeType) => {
                    acc[codeType] = mapCommCodeToSelectOptions(
                        commCodes[codeType],
                    )
                    return acc
                },
                {} as Record<string, SelectObjectType[]>,
            )

            // 필터 조건 정의
            const filterCriteria: Record<string, string[]> = {
                PR001: ['*', '60', '70', '80'],
                PR002: ['*', '50', '60'],
                PR003: ['*'],
                PR004: ['*'],
                PR005: ['*'],
                PR006: ['*'],
                PR007: ['*'],
                PR008: ['*'],
                PR009: ['*'],
            }

            // 조건에 따라 필터링
            Object.keys(filterCriteria).forEach(key => {
                if (processedCodeItems[key]) {
                    processedCodeItems[key] = processedCodeItems[key].filter(
                        item => !filterCriteria[key].includes(item.value),
                    )
                }
            })
            setCodeItems(processedCodeItems)
            setFlag(true)
        }

        getCommCode()

        // 관리자정보 가져오기
        async function getUserList() {
            const response = await get<{
                userNo: any
                name: any
                result: { LIST: { userNo: number; name: string }[] }
            }>('/api/product/userList', [
                { key: 'userNo', value: getSession('userNo') },
            ])

            if (
                response.valid &&
                response.result &&
                Array.isArray(response.result.LIST)
            ) {
                const formattedOptions: SelectType[] = response.result.LIST.map(
                    user => ({
                        value: user.userNo,
                        text: user.name,
                    }),
                )

                setAdminOptions(formattedOptions)

                setProdValues(prevValues => ({
                    ...prevValues,
                    prodMngUser: getSession('userNo'),
                }))
            }
        }

        getUserList()
    }, [])

    // 파일 업로드 핸들러
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setUploadedFiles(prevFiles => [...prevFiles, ...files]) // 기존 파일 뒤에 추가
    }

    const { confirm } = useAlert({
        icon: 'warning',
        title: '사진 삭제',
        text: '기존 사진 파일을 삭제하시겠습니까?',
    })

    const { open: ImgRemveSucc } = useAlert({
        icon: 'success',
        title: '사진 삭제',
        text: '삭제가 완료되었습니다.',
    })

    const { open: ImgRemveErr } = useAlert({
        icon: 'error',
        title: '사진 삭제',
        text: '사진 파일 삭제중 오류가 발생하였습니다.',
    })

    const handleRemoveServerImage = async (filePath: string) => {
        try {
            confirm(async () => {
                const response = await post('/api/product/removeServerImage', {
                    filePath,
                })

                if (response.valid) {
                    setServerFiles(prevState =>
                        prevState.filter(file => file !== filePath),
                    )

                    ImgRemveSucc()
                } else {
                    ImgRemveErr()
                }
            })
        } catch (error) {
            console.error('확인창 처리 중 오류 발생:', error)
            ImgRemveErr()
        }
    }

    const handleRemoveImage = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index))
    }

    // 셀렉트박스 onChange 핸들러
    const handleOptionChange =
        (key: string) => (option: { value: string; text: string }) => {
            setProdValues(prevValues => ({
                ...prevValues,
                [key]: option.value,
            }))
        }

    // 라디오 onChange 핸들러
    const handleRadioChange =
        (key: string) => (selectedItem: SelectObjectType) => {
            setProdValues(prevValues => ({
                ...prevValues,
                [key]: selectedItem.value,
            }))
        }

    // remarks 배열에 체크된 값을 추가하거나 제거하는 함수
    const handleRemarksChange = (selectedItems: SelectObjectType[]) => {
        const selectedValues = selectedItems.map(item => item.value)

        // remarks 상태 업데이트
        setProdValues(prevState => ({
            ...prevState,
            remarks: selectedValues,
        }))
    }

    const { open: numberVaild } = useAlert({
        icon: 'error',
        title: '값오류',
        text: '해당 값은 숫자값만 입력이 가능합니다.',
    })

    const handleInputChange = (key: string) => (inputValue: string) => {
        if (
            (key === 'deposit' || key == 'monthlyRent') &&
            isNaN(Number(inputValue))
        ) {
            return numberVaild()
        }
        setProdValues(prevValues => ({
            ...prevValues,
            [key]: inputValue,
        }))
    }
    const { open: regOpen } = useAlert({
        icon: 'success',
        title: '매물등록',
        text: '저장이 완료되었습니다.',
    })
    const { open: updateOpen } = useAlert({
        icon: 'success',
        title: '매물정보수정',
        text: '수정이 완료되었습니다.',
    })

    const { open: tradeTypeValid } = useAlert({
        icon: 'error',
        title: '거래방식',
        text: '거래방식은 필수입니다',
    })
    const { open: typeValid } = useAlert({
        icon: 'error',
        title: '거래종류',
        text: '거래종류는 필수입니다',
    })

    const { open: titleValid } = useAlert({
        icon: 'error',
        title: '매물명',
        text: '매물명은 필수입니다.',
    })

    async function addProdReg() {
        if (prodValues.type === '') {
            return typeValid()
        }
        if (prodValues.tradeType === '') {
            return tradeTypeValid()
        }
        if (prodValues.title === '') {
            return titleValid()
        }

        if (prodValues.deposit === '') {
            setProdValues(prevValues => ({
                ...prevValues,
                deposit: '0',
            }))
        }
        if (prodValues.monthlyRent === '') {
            setProdValues(prevValues => ({
                ...prevValues,
                monthlyRent: '0',
            }))
        }

        const formData = new FormData()
        if (mode === 'U') {
            formData.append('prodNo', prevProdNo)
        }

        formData.append(
            'productDto',
            new Blob(
                [
                    JSON.stringify({
                        tradeType: prodValues.tradeType,
                        title: prodValues.title,
                        type: prodValues.type,
                        statusCd: '10',
                        entrancePwd: prodValues.entrancePwd,
                        unitPwd: prodValues.unitPwd,
                        phoneNo1: prodValues.phonNo1,
                        phoneNo2: prodValues.phonNo2,
                        unitNo: prodValues.unitNo,
                        etc: prodValues.etc,
                        deposit: prodValues.deposit,
                        monthlyRent: prodValues.monthlyRent,
                        directionCd: prodValues.direction,
                        rcmCd: prodValues.rcm,
                        roomCd: prodValues.room,
                        bathCd: prodValues.bath,
                        moveInCd: prodValues.moveIn,
                        prodAddr: prodValues.prodAddr,
                        prodRoadAddr: prodValues.prodRoadAddr,
                        regUserId: getSession('userNo'),
                        chgUserId: getSession('userNo'),
                        prodMngUser: prodValues.prodMngUser,
                        propertyX: prodValues.propertyX,
                        propertyY: prodValues.propertyY,
                    }),
                ],
                { type: 'application/json' },
            ),
        )

        // `remarkCds` 배열을 Blob으로 추가 (JSON.stringify 없이)
        formData.append(
            'remarkCds',
            new Blob([JSON.stringify(prodValues.remarks)], {
                type: 'application/json',
            }),
        )

        // 파일 추가 (이미지 파일)  새로 추가 된 사진 파일
        uploadedFiles.forEach(file => {
            formData.append('imges', file)
        })

        try {
            let requestUrl = '/api/product/addProdReg'
            if (mode === 'U') {
                requestUrl = '/api/product/udpateProdInfo'
            }
            const response = await postFormData(requestUrl, formData)

            if (response.valid && response.result) {
                if (mode === 'U') {
                    updateOpen()
                } else {
                    regOpen()
                }
                navigate('/home', {})
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSaveProdInfo = () => {
        addProdReg()
    }

    const [popup, setPopup] = useState(false)

    const handleInput = (key: string) => (inputValue: string) => {
        setProdValues(prevValues => ({
            ...prevValues,
            [key]: inputValue,
        }))
    }

    const handleComplete = () => {
        setPopup(!popup)
    }

    const closeModal = () => setPopup(false)

    return (
        <>
            {flag ? (
                <>
                    <Header />
                    <Wrapper>
                        <ContantWrap>
                            <TitleWrapper>
                                <Title>매물등록</Title>
                                <ASelector
                                    options={adminOptions}
                                    value={prodValues.prodMngUser}
                                    onChange={handleOptionChange('prodMngUser')}
                                    placeholder="담당자"
                                />
                            </TitleWrapper>
                            <Table>
                                <TableCaption>매물정보</TableCaption>
                                <tbody>
                                    <tr>
                                        <SpecialCell>거래종류</SpecialCell>
                                        <Cell>
                                            <ARadioButtonGroup
                                                items={codeItems['PR001']}
                                                value={prodValues.type}
                                                onChange={handleRadioChange(
                                                    'type',
                                                )}
                                            />
                                        </Cell>
                                        <SpecialCell>거래방식</SpecialCell>
                                        <Cell>
                                            <ARadioButtonGroup
                                                items={codeItems['PR002']}
                                                value={prodValues.tradeType}
                                                onChange={handleRadioChange(
                                                    'tradeType',
                                                )}
                                            />
                                        </Cell>
                                    </tr>
                                    <tr>
                                        <SpecialCell>매물명</SpecialCell>
                                        <Cell>
                                            <AInput
                                                width="100%"
                                                placeholder="매물명"
                                                value={prodValues.title}
                                                onChange={handleInputChange(
                                                    'title',
                                                )}
                                            />
                                        </Cell>
                                        <SpecialCell>세대호수</SpecialCell>
                                        <Cell>
                                            <AInput
                                                width="100%"
                                                placeholder="세대호수"
                                                value={prodValues.unitNo}
                                                onChange={handleInputChange(
                                                    'unitNo',
                                                )}
                                            />
                                        </Cell>
                                    </tr>
                                    <tr>
                                        <SpecialCell>현관비번</SpecialCell>
                                        <Cell>
                                            <AInput
                                                width="100%"
                                                placeholder="현관비번"
                                                value={prodValues.entrancePwd}
                                                onChange={handleInputChange(
                                                    'entrancePwd',
                                                )}
                                            />
                                        </Cell>
                                        <SpecialCell>연락처1</SpecialCell>
                                        <Cell>
                                            <AInput
                                                width="100%"
                                                placeholder="연락처1"
                                                value={prodValues.phonNo1}
                                                onChange={handleInputChange(
                                                    'phonNo1',
                                                )}
                                            />
                                        </Cell>
                                    </tr>
                                    <tr>
                                        <SpecialCell>세대비번</SpecialCell>
                                        <Cell>
                                            <AInput
                                                width="100%"
                                                placeholder="세대비번"
                                                value={prodValues.unitPwd}
                                                onChange={handleInputChange(
                                                    'unitPwd',
                                                )}
                                            />
                                        </Cell>
                                        <SpecialCell>연락처2</SpecialCell>
                                        <Cell>
                                            <AInput
                                                width="100%"
                                                placeholder="연락처2"
                                                value={prodValues.phonNo2}
                                                onChange={handleInputChange(
                                                    'phonNo2',
                                                )}
                                            />
                                        </Cell>
                                    </tr>
                                </tbody>
                            </Table>

                            <Table>
                                <TableCaption>거래종류</TableCaption>
                                <tbody>
                                    <tr>
                                        <SpecialCell>
                                            보증금/월세(만원)
                                        </SpecialCell>
                                        <CellInput>
                                            <AInput
                                                width="48%"
                                                placeholder="보증금"
                                                value={prodValues.deposit}
                                                onChange={handleInputChange(
                                                    'deposit',
                                                )}
                                            />
                                            <AInput
                                                width="48%"
                                                placeholder="월세"
                                                value={prodValues.monthlyRent}
                                                onChange={handleInputChange(
                                                    'monthlyRent',
                                                )}
                                            />
                                        </CellInput>
                                        <SpecialCell>방향/추천</SpecialCell>
                                        <CellInput>
                                            <ASelector
                                                options={codeItems['PR005']}
                                                placeholder={'방향'}
                                                value={prodValues.direction}
                                                onChange={handleOptionChange(
                                                    'direction',
                                                )}
                                            />
                                            <ASelector
                                                options={codeItems['PR007']}
                                                placeholder={'추천'}
                                                value={prodValues.rcm}
                                                onChange={handleOptionChange(
                                                    'rcm',
                                                )}
                                            />
                                        </CellInput>
                                    </tr>
                                    <tr>
                                        <SpecialCell>방/욕실</SpecialCell>
                                        <CellInput>
                                            <ASelector
                                                options={codeItems['PR003']}
                                                placeholder={'방 수'}
                                                value={prodValues.room}
                                                onChange={handleOptionChange(
                                                    'room',
                                                )}
                                            />
                                            <ASelector
                                                options={codeItems['PR004']}
                                                placeholder={'욕실 수'}
                                                value={prodValues.bath}
                                                onChange={handleOptionChange(
                                                    'bath',
                                                )}
                                            />
                                        </CellInput>
                                        <SpecialCell>입주정보</SpecialCell>
                                        <Cell>
                                            <ARadioButtonGroup
                                                items={codeItems['PR006']}
                                                value={prodValues.moveIn}
                                                onChange={handleRadioChange(
                                                    'moveIn',
                                                )}
                                            />
                                        </Cell>
                                    </tr>
                                    <tr>
                                        <SpecialCell>특이사항</SpecialCell>
                                        <Cell colSpan={3}>
                                            <ACheckBoxGroup
                                                cols={6}
                                                value={prodValues.remarks}
                                                items={codeItems['PR008']}
                                                onChange={handleRemarksChange}
                                            />
                                        </Cell>
                                    </tr>
                                </tbody>
                            </Table>

                            <Table>
                                <TableCaption>위치정보</TableCaption>
                                <tbody>
                                    <tr>
                                        <SpecialCell>주소찾기</SpecialCell>
                                        <BtnCell>
                                            <AButton onClick={handleComplete}>
                                                주소찾기
                                            </AButton>
                                            <JosoPopWrap>
                                                {popup && (
                                                    <Post
                                                        onClose={closeModal}
                                                        company={prodValues}
                                                        setProdValues={
                                                            setProdValues
                                                        }
                                                    ></Post>
                                                )}
                                            </JosoPopWrap>
                                        </BtnCell>
                                        <MapCell rowSpan={3}>
                                            주소 검색을 하시면 해당 위치가
                                            지도에 표시됩니다.
                                        </MapCell>
                                    </tr>
                                    <tr>
                                        <SpecialCell>도로명주소</SpecialCell>
                                        <Cell>
                                            <AInput
                                                width="100%"
                                                placeholder="도로명주소"
                                                onChange={handleInputChange(
                                                    'prodRoadAddr',
                                                )}
                                                value={prodValues.prodRoadAddr}
                                                disabled={true}
                                            />
                                        </Cell>
                                    </tr>
                                    <tr>
                                        <SpecialCell>지번주소</SpecialCell>
                                        <Cell>
                                            <AInput
                                                width="100%"
                                                placeholder="지번주소"
                                                value={prodValues.prodAddr}
                                                onChange={handleInput(
                                                    'prodAddr',
                                                )}
                                                disabled={true}
                                            />
                                        </Cell>
                                    </tr>
                                </tbody>
                            </Table>

                            <Table>
                                <TableCaption>기타정보</TableCaption>
                                <tbody>
                                    <tr>
                                        <Cell>
                                            <ATextarea
                                                width={'100%'}
                                                value={prodValues.etc}
                                                onChange={handleInputChange(
                                                    'etc',
                                                )}
                                            />
                                        </Cell>
                                    </tr>
                                </tbody>
                            </Table>

                            <Table>
                                <TableCaption>매물사진</TableCaption>
                                <tbody>
                                    <tr>
                                        <ImgCell>매물사진</ImgCell>
                                        <Cell>
                                            <input
                                                type="file"
                                                id="fileUpload"
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                style={{ display: 'flex' }}
                                            />
                                            <ImageContainer id="imageContainer">
                                                {serverFiles.map(
                                                    (filePath, index) => (
                                                        <ImageWrapper
                                                            key={`server-${index}`}
                                                        >
                                                            <ImagePreview
                                                                src={filePath}
                                                                alt={`Server File ${index}`}
                                                            />
                                                            <RemoveButton
                                                                onClick={() =>
                                                                    handleRemoveServerImage(
                                                                        filePath,
                                                                    )
                                                                }
                                                            >
                                                                X
                                                            </RemoveButton>
                                                        </ImageWrapper>
                                                    ),
                                                )}

                                                {uploadedFiles.map(
                                                    (file, index) => (
                                                        <ImageWrapper
                                                            key={`uploaded-${index}`}
                                                        >
                                                            <ImagePreview
                                                                src={URL.createObjectURL(
                                                                    file,
                                                                )}
                                                                alt="Uploaded File"
                                                            />
                                                            <RemoveButton
                                                                onClick={() =>
                                                                    handleRemoveImage(
                                                                        index,
                                                                    )
                                                                }
                                                            >
                                                                X
                                                            </RemoveButton>
                                                        </ImageWrapper>
                                                    ),
                                                )}
                                            </ImageContainer>
                                        </Cell>
                                    </tr>
                                </tbody>
                            </Table>

                            <div
                                style={{
                                    textAlign: 'center',
                                    paddingBottom: '50px',
                                }}
                            >
                                <AButton onClick={handleSaveProdInfo}>
                                    {mode === ''
                                        ? '저장하기'
                                        : mode === 'U'
                                        ? '수정하기'
                                        : '저장하기'}
                                </AButton>
                            </div>
                        </ContantWrap>
                    </Wrapper>
                </>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default ProdRegistration
