import Header from 'components/Elements/Header/Header'
import ARangeSelector from 'components/Elements/ARangeSelector/ARangeSelector'
import ACheckSelector from 'components/Elements/ACheckSelector/ACheckSelector'
import AButton from 'components/Elements/AButton/AButton'
import AModal from 'components/Elements/AModal/AModal'
import { useEffect, useState, useRef } from 'react'
import { useSession } from 'api/Session'
import {
    COMM_CODE_TYPES,
    COMM_CODE_MAP,
    PLACEHOLDER_MAP,
} from 'constants/constants'
import { formatDate, formatPhoneNumber } from 'utils/Formatter'
import { useAxios } from 'api/Axios'
import { DataType } from 'types/home.type'
import { CommCodesType } from 'types/commCodes.type'
import { SelectObjectType } from 'types/select'
import { useAlert } from 'components/Elements/Alert/Alert'
import { useNavigate } from 'react-router-dom'
import {
    CommDiv,
    Container,
    Sidebar,
    MapWrapper,
    Card,
    BtnDiv,
    ImageContainer,
    ImagePreview,
    ImageWrapper,
    PropertyInfoContainer,
    PropertyHeader,
    PropertyTitle,
    PropertyDetail,
    TradeTypeBadge,
    TypeBadge,
} from './Map.styles'

declare global {
    interface Window {
        kakao: any
    }
}

const Map = () => {
    const [clusterer, setClusterer] = useState<any>(null)
    const [visibleProperties, setVisibleProperties] = useState<DataType[]>([])
    const markersRef = useRef<any[]>([])
    const [properties, setProperties] = useState<any[]>([])
    const [map, setMap] = useState<any>(null)
    const [searchText, setSearchText] = useState('')
    const [filters, setFilters] = useState<Record<string, string[]>>({})
    const [filteredData, setFilteredData] = useState<DataType[]>([])
    const [serverFiles, setServerFiles] = useState<string[]>([])
    const [selectedProds, setSelectedProds] = useState<DataType[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [rangeFilter, setRangeFilter] = useState({
        deposit: { min: 0, max: 99999 },
        monthlyRent: { min: 0, max: 99999 },
    })
    const [codeItems, setCodeItems] = useState<
        Record<string, SelectObjectType[]>
    >({})

    const navigate = useNavigate()
    const { get, post } = useAxios()
    const { getSession } = useSession()

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

    const mapCommCodeToSelectOptions = (
        codeList: CommCodesType[],
    ): SelectObjectType[] =>
        codeList.map(item => ({
            text: item.cdNm,
            value: item.dtlCd,
        }))

    // 공통 함수로 빼둔 매물 조회 함수
    const selectProduct = async () => {
        const res = await get<DataType>('/api/product/products')

        if (res.valid && res.result) {
            setProperties(res.result.LIST)
        }
    }

    // 조회조건에 따른 필터 하는 코드
    useEffect(() => {
        const filteredData = properties.filter(item => {
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
    }, [filters, rangeFilter, properties, searchText])

    const updateVisibleProperties = (
        currentMap: any,
        currentClusterer: any,
    ) => {
        if (!currentMap || !currentClusterer || !filteredData.length) return

        const bounds = currentMap.getBounds()

        const visible = filteredData.filter(property => {
            const position = new window.kakao.maps.LatLng(
                property.propertyX,
                property.propertyY,
            )
            return bounds.contain(position)
        })

        setVisibleProperties(visible)
    }

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps || !filteredData.length) return

        const container = document.getElementById('map')
        const options = {
            center: new window.kakao.maps.LatLng(35.230365, 129.089654),
            level: 6,
        }

        const newMap = new window.kakao.maps.Map(container, options)
        const zoomControl = new window.kakao.maps.ZoomControl()
        newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

        const mapTypeControl = new window.kakao.maps.MapTypeControl()
        newMap.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.TOPRIGHT,
        )

        const newClusterer = new window.kakao.maps.MarkerClusterer({
            map: newMap,
            averageCenter: true,
            minLevel: 4,
            disableClickZoom: true,
            gridSize: 60,
            styles: [
                {
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 80, 80, .8)',
                    borderRadius: '25px',
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    lineHeight: '50px',
                },
            ],
        })

        setMap(newMap)
        setClusterer(newClusterer)

        const handleMapChange = () =>
            updateVisibleProperties(newMap, newClusterer)

        window.kakao.maps.event.addListener(newMap, 'idle', handleMapChange)
        window.kakao.maps.event.addListener(
            newMap,
            'zoom_changed',
            handleMapChange,
        )
        window.kakao.maps.event.addListener(
            newClusterer,
            'clusterclick',
            (cluster: any) => {
                const level = newMap.getLevel() - 2
                newMap.setLevel(level, { anchor: cluster.getCenter() })
                updateVisibleProperties(newMap, newClusterer)
            },
        )

        handleMapChange()

        return () => {
            window.kakao.maps.event.removeListener(
                newMap,
                'idle',
                handleMapChange,
            )
            window.kakao.maps.event.removeListener(
                newMap,
                'zoom_changed',
                handleMapChange,
            )
            window.kakao.maps.event.removeListener(
                newClusterer,
                'clusterclick',
                handleMapChange,
            )
        }
    }, [filteredData])

    // 맵검색 페이지가 렌더링 될 때 카카오맵을 만들어주는 코드
    useEffect(() => {
        selectProduct()
        const fetchCodeItems = async () => {
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

        fetchCodeItems()
    }, [])

    // 매물 지도에 찍어주는 코드
    useEffect(() => {
        if (!map || !clusterer || !filteredData.length) return

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null))
        clusterer.clear()
        markersRef.current = []

        const newMarkers = filteredData.map((property, index) => {
            const coords = new window.kakao.maps.LatLng(
                property.propertyX,
                property.propertyY,
            )

            const marker = new window.kakao.maps.Marker({
                position: coords,
                title: property.title,
            })

            marker.propertyIndex = index

            // 마커 클릭 이벤트 리스너 추가
            window.kakao.maps.event.addListener(marker, 'click', () => {
                const selectedProperty = filteredData[marker.propertyIndex]
                const selectedX = selectedProperty.propertyX
                const selectedY = selectedProperty.propertyY

                // 동일한 좌표를 가진 매물 필터링
                const matchingProperties = filteredData.filter(property => {
                    return (
                        property.propertyX === selectedX &&
                        property.propertyY === selectedY
                    )
                })

                // tradeType이 '10'인 매물을 첫 번째로 정렬
                const sortedProperties = matchingProperties.sort((a, b) => {
                    if (a.tradeType === '10' && b.tradeType !== '10') return -1 // a를 먼저
                    if (a.tradeType !== '10' && b.tradeType === '10') return 1 // b를 먼저
                    return 0 // 기존 순서 유지
                })

                // 상태 업데이트
                setVisibleProperties(sortedProperties)
            })

            return marker
        })

        // Add markers to clusterer
        markersRef.current = newMarkers
        clusterer.addMarkers(newMarkers)

        // Update visible properties
        updateVisibleProperties(map, clusterer)

        return () => {
            markersRef.current.forEach(marker => marker.setMap(null))
            clusterer.clear()
            markersRef.current = []
        }
    }, [filteredData, map, clusterer])

    // 사이드바에서 매물 클릭 했을 때 해당 매물의 주소로 지도 이동 시켜주는 코드
    const handlePropertyClick = async (property: DataType[]) => {
        const response = await get<string>('/api/product/getImgsrcByProdNo', [
            { key: 'prodNo', value: property[0].prodNo },
        ])

        if (response.valid && response.result) {
            const images: string[] = response.result.LIST
            setServerFiles(images)
            setSelectedProds(property)
            setModalOpen(true)
        }

        if (map) {
            const coords = new window.kakao.maps.LatLng(
                property[0].propertyX,
                property[0].propertyY,
            )
            map.setCenter(coords)
            map.setLevel(3)
        }
    }

    // 헤더의 input의 value값을 추출하는 코드
    const handleInputChange = (value: string) => {
        setSearchText(value)
    }

    // 보증금, 월세의 값을 추출하는 코드
    const handleRangeChange = (
        type: 'deposit' | 'monthlyRent',
        range: { min: number; max: number },
    ) => {
        setRangeFilter(prev => ({
            ...prev,
            [type]: range,
        }))
    }

    // 보증금, 월세를 제외 한 필터 조건의 값을 추출하는 코드
    const handleChangeSelector = (key: string, selectedItems: string[]) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: selectedItems,
        }))
    }

    // 매물 수정
    const handleCrrection = (row: DataType) => {
        const itemToUpdate = { ...row, chgResn: 'U' }

        switch (row.type) {
            case '10':
            case '20':
            case '30':
            case '40':
                navigate('/product/registration', {
                    state: { item: itemToUpdate },
                })
                break
            case '50':
                navigate('/bargain/registration', {
                    state: { item: itemToUpdate },
                })
                break
            case '60':
                navigate('/rent/registration', {
                    state: { item: itemToUpdate },
                })
                break
        }
    }

    // 매물 카피
    const handleCopy = (row: DataType) => {
        const itemToCopy = { ...row, chgResn: 'C' }

        switch (row.type) {
            case '10':
            case '20':
            case '30':
            case '40':
                navigate('/product/registration', {
                    state: { item: itemToCopy },
                })
                break
            case '50':
                navigate('/bargain/registration', {
                    state: { item: itemToCopy },
                })
                break
            case '60':
                navigate('/rent/registration', {
                    state: { item: itemToCopy },
                })
                break
        }
    }

    // 매물 최신일자 업데이트
    const handleUpdateNewDtm = async (row: DataType) => {
        const response = await post<void>('/api/product/updateNewDtm', {
            prodNo: row.prodNo,
            userNo: getSession('userNo'),
        })

        if (response.valid && response.result) {
            successUpdate(() => {
                selectProduct()
            })
        }
    }

    // 매물 삭제
    const handleDeleteProd = async (row: DataType) => {
        const response = await post<void>('/api/product/deleteProduct', {
            prodNo: row.prodNo,
        })

        if (response.valid && response.result) {
            successDelete(() => {
                selectProduct()
            })
        }
    }

    const handleCloseModal = (close: boolean) => {
        setModalOpen(close)
    }

    const tradeTypeStyle = {
        color: '#e74c3c',
        fontWeight: 'normal',
    }

    const typeStyle = {
        color: '#0066ff',
        fontWeight: 'normal',
    }

    return (
        <>
            <Header handleInputChange={handleInputChange} />
            <CommDiv>
                <ARangeSelector
                    onChange={range => handleRangeChange('deposit', range)}
                    min={0}
                    max={10000}
                    placeholder="보증금"
                    mr="10px"
                />
                <ARangeSelector
                    onChange={range => handleRangeChange('monthlyRent', range)}
                    min={0}
                    max={200}
                    placeholder="월세"
                    mr="10px"
                />
                {COMM_CODE_TYPES.map((codeType, index) => {
                    return (
                        <ACheckSelector
                            key={codeType}
                            options={codeItems[codeType] || []}
                            placeholder={PLACEHOLDER_MAP[codeType]}
                            onChange={selectedItems =>
                                handleChangeSelector(codeType, selectedItems)
                            }
                            mr="10px"
                        />
                    )
                })}
            </CommDiv>
            <Container>
                <Sidebar>
                    <h2
                        style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '20px',
                            paddingBottom: '10px',
                        }}
                    >
                        매물 리스트 ({visibleProperties.length}건)
                    </h2>
                    {visibleProperties.map((property, index) => (
                        <Card
                            key={index}
                            onClick={() => handlePropertyClick(Array(property))}
                        >
                            <div>
                                <h3
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {property.tradeType === '10' && (
                                        <span style={tradeTypeStyle}>
                                            [건물]{' '}
                                        </span>
                                    )}
                                    {property.tradeType === '20' && (
                                        <span style={tradeTypeStyle}>
                                            [월세]{' '}
                                        </span>
                                    )}
                                    {property.tradeType === '30' && (
                                        <span style={tradeTypeStyle}>
                                            [전세]{' '}
                                        </span>
                                    )}
                                    {property.tradeType === '40' && (
                                        <span style={tradeTypeStyle}>
                                            [반전세]{' '}
                                        </span>
                                    )}
                                    {property.tradeType === '50' && (
                                        <span style={tradeTypeStyle}>
                                            [매매]{' '}
                                        </span>
                                    )}
                                    {property.tradeType === '60' && (
                                        <span style={tradeTypeStyle}>
                                            [임대]{' '}
                                        </span>
                                    )}

                                    {property.type === '10' && (
                                        <div style={typeStyle}>[원룸]</div>
                                    )}
                                    {property.type === '20' && (
                                        <div style={typeStyle}>[오피스텔]</div>
                                    )}
                                    {property.type === '30' && (
                                        <div style={typeStyle}>[아파트]</div>
                                    )}
                                    {property.type === '40' && (
                                        <div style={typeStyle}>[빌라]</div>
                                    )}
                                    {property.type === '50' && (
                                        <div style={typeStyle}>[주택]</div>
                                    )}
                                    {property.type === '60' && (
                                        <div style={typeStyle}>[상가]</div>
                                    )}
                                    {property.type === '70' && (
                                        <div style={typeStyle}>[토지]</div>
                                    )}
                                </h3>
                                <h3>{property.title}</h3>
                            </div>

                            <p className="highlight">
                                {property.tradeType === '10' ||
                                property.tradeType === '20' ||
                                property.tradeType === '30' ||
                                property.tradeType === '40'
                                    ? property.depositAndMonthlyRent ||
                                      '정보 없음'
                                    : property.tradeType === '50'
                                    ? property.salePricdAndDepoAndRent ||
                                      '정보 없음'
                                    : property.tradeType === '60'
                                    ? property.depositAndMonthlyRentAndPreFee ||
                                      '정보 없음'
                                    : '정보 없음'}
                            </p>
                            <p>
                                현관: {property.entrancePwd} / 세대:{' '}
                                {property.unitPwd} / 호실: {property.unitNo}
                            </p>
                            <p>주소: {property.prodAddr}</p>
                            <p>
                                번호: {formatPhoneNumber(property.phoneNo1)} /{' '}
                                {formatPhoneNumber(property.phoneNo2)}
                            </p>
                            <p>
                                기타정보:{' '}
                                {property.etc ? property.etc : '정보 없음'}
                            </p>
                            <p>{formatDate(property.newDtm)}</p>

                            <BtnDiv>
                                <AButton
                                    onClick={event => {
                                        event.stopPropagation()
                                        handleCrrection(property)
                                    }}
                                    width="50px"
                                    mr="8px"
                                >
                                    수정
                                </AButton>

                                <AButton
                                    onClick={event => {
                                        event.stopPropagation()
                                        handleCopy(property)
                                    }}
                                    width="50px"
                                    mr="8px"
                                >
                                    복사
                                </AButton>
                                <AButton
                                    onClick={event => {
                                        event.stopPropagation()
                                        handleUpdateNewDtm(property)
                                    }}
                                    width="50px"
                                    mr="8px"
                                >
                                    UP
                                </AButton>
                                <AButton
                                    onClick={event => {
                                        event.stopPropagation()
                                        handleDeleteProd(property)
                                    }}
                                    width="50px"
                                >
                                    삭제
                                </AButton>
                            </BtnDiv>
                        </Card>
                    ))}
                </Sidebar>

                <MapWrapper id="map"></MapWrapper>
            </Container>
            <AModal
                showSaveBtn
                modalH="95%"
                title="매물 상세"
                value={modalOpen}
                onClose={handleCloseModal}
            >
                {selectedProds.map((property, index) => (
                    <PropertyInfoContainer key={index}>
                        <PropertyHeader>
                            {property.tradeType === '10' && (
                                <TradeTypeBadge>[건물]</TradeTypeBadge>
                            )}
                            {property.tradeType === '20' && (
                                <TradeTypeBadge>[월세]</TradeTypeBadge>
                            )}
                            {property.tradeType === '30' && (
                                <TradeTypeBadge>[전세]</TradeTypeBadge>
                            )}
                            {property.tradeType === '40' && (
                                <TradeTypeBadge>[반전세]</TradeTypeBadge>
                            )}
                            {property.tradeType === '50' && (
                                <TradeTypeBadge>[매매]</TradeTypeBadge>
                            )}
                            {property.tradeType === '60' && (
                                <TradeTypeBadge>[임대]</TradeTypeBadge>
                            )}

                            {property.type === '10' && (
                                <TypeBadge>[원룸]</TypeBadge>
                            )}
                            {property.type === '20' && (
                                <TypeBadge>[오피스텔]</TypeBadge>
                            )}
                            {property.type === '30' && (
                                <TypeBadge>[아파트]</TypeBadge>
                            )}
                            {property.type === '40' && (
                                <TypeBadge>[빌라]</TypeBadge>
                            )}
                            {property.type === '50' && (
                                <TypeBadge>[주택]</TypeBadge>
                            )}
                            {property.type === '60' && (
                                <TypeBadge>[상가]</TypeBadge>
                            )}
                            {property.type === '70' && (
                                <TypeBadge>[토지]</TypeBadge>
                            )}
                        </PropertyHeader>

                        <PropertyTitle>{property.title}</PropertyTitle>

                        <PropertyDetail>
                            <strong>가격: </strong>
                            {property.tradeType === '10' ||
                            property.tradeType === '20' ||
                            property.tradeType === '30' ||
                            property.tradeType === '40'
                                ? property.depositAndMonthlyRent || '정보 없음'
                                : property.tradeType === '50'
                                ? property.salePricdAndDepoAndRent ||
                                  '정보 없음'
                                : property.tradeType === '60'
                                ? property.depositAndMonthlyRentAndPreFee ||
                                  '정보 없음'
                                : '정보 없음'}
                        </PropertyDetail>

                        <PropertyDetail>
                            <strong>현관:</strong> {property.unitPwd} /{' '}
                            <strong>세대:</strong> {property.entrancePwd} /{' '}
                            <strong>호실:</strong> {property.unitNo}
                        </PropertyDetail>

                        <PropertyDetail>
                            <strong>주소:</strong> {property.prodAddr}
                        </PropertyDetail>

                        <PropertyDetail>
                            <strong>번호:</strong>{' '}
                            <a
                                href={`tel:${property.phoneNo1}`}
                                onClick={e => e.stopPropagation()}
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                {formatPhoneNumber(property.phoneNo1)}
                            </a>
                            {property.phoneNo2 && (
                                <>
                                    {' '}
                                    /{' '}
                                    <a
                                        href={`tel:${property.phoneNo2}`}
                                        onClick={e => e.stopPropagation()}
                                        style={{
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {formatPhoneNumber(property.phoneNo2)}
                                    </a>
                                </>
                            )}
                        </PropertyDetail>

                        <PropertyDetail>
                            <strong>기타정보:</strong>{' '}
                            {property.etc ? property.etc : '정보 없음'}
                        </PropertyDetail>

                        <PropertyDetail>
                            {formatDate(property.newDtm)}
                        </PropertyDetail>
                    </PropertyInfoContainer>
                ))}

                <ImageContainer>
                    {serverFiles.map((filePath, index) => (
                        <ImageWrapper key={`server-${index}`}>
                            <ImagePreview
                                src={filePath}
                                alt={`Server File ${index}`}
                            />
                        </ImageWrapper>
                    ))}
                </ImageContainer>
            </AModal>
        </>
    )
}

export default Map
