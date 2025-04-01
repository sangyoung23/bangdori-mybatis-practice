import { CommDiv, BtnDiv, Container, MobileHeaderDiv } from './Home.styles'
import {
    HeaderSectionProps,
    FilterSectionProps,
    ButtonSectionProps,
} from 'types/home.type'
import { Link } from 'react-router-dom'
import { Img } from 'components/Elements/Header/Header.styles'

import Grid from 'components/Grid/Grid'
import logo2 from 'assets/img/bangdoriLogo.png'
import Header from 'components/Elements/Header/Header'
import ACheckSelector from 'components/Elements/ACheckSelector/ACheckSelector'
import ARangeSelector from 'components/Elements/ARangeSelector/ARangeSelector'
import AButton from 'components/Elements/AButton/AButton'
import { useProductData } from 'hooks/useProductData'
import { useCommCodes } from 'hooks/useCommCodes'
import { useResponsive } from 'hooks/useResponsive'
import { useProductActions } from 'hooks/useProductActions'
import { PLACEHOLDER_MAP, COMM_CODE_TYPES } from 'constants/constants'

const styles = {
    link: {
        textDecoration: 'none',
        color: '#333',
        fontWeight: '500',
        fontSize: '16px',
        marginTop: '5px',
        marginBottom: '15px',
    },
}

const HeaderSection = ({ mobileSize, handleInputChange }: HeaderSectionProps) =>
    mobileSize ? (
        <MobileHeaderDiv>
            <Link style={styles.link} to="/home">
                <Img src={logo2} alt="로고" />
            </Link>
            <Link style={styles.link} to="/map">
                맵검색
            </Link>
        </MobileHeaderDiv>
    ) : (
        <Header handleInputChange={handleInputChange} />
    )

const FilterSection = ({
    handleRangeChange,
    codeItems,
    handleChangeSelector,
}: FilterSectionProps) => (
    <CommDiv>
        <ARangeSelector
            onChange={range => handleRangeChange('deposit', range)}
            min={0}
            max={99999}
            placeholder="보증금"
            mr="10px"
        />
        <ARangeSelector
            onChange={range => handleRangeChange('monthlyRent', range)}
            min={0}
            max={99999}
            placeholder="월세"
            mr="10px"
        />
        {COMM_CODE_TYPES.map(codeType => (
            <ACheckSelector
                key={codeType}
                options={codeItems[codeType] || []}
                placeholder={PLACEHOLDER_MAP[codeType]}
                onChange={selectedItems =>
                    handleChangeSelector(codeType, selectedItems)
                }
                mr="10px"
            />
        ))}
    </CommDiv>
)

const ButtonSection = ({
    handleCrrection,
    handleCopy,
    handleUpdateNewDtm,
    handleDeleteProd,
}: ButtonSectionProps) => (
    <BtnDiv>
        <AButton onClick={handleCrrection} width="60px" mr="8px">
            수정
        </AButton>
        <AButton onClick={handleCopy} width="60px" mr="8px">
            복사
        </AButton>
        <AButton onClick={handleUpdateNewDtm} width="60px" mr="8px">
            UP
        </AButton>
        <AButton onClick={handleDeleteProd} width="60px">
            삭제
        </AButton>
    </BtnDiv>
)

function Home() {
    const {
        selectProduct,
        handleChangeSelector,
        handleRangeChange,
        handleInputChange,
        filteredData,
    } = useProductData()
    const { codeItems } = useCommCodes(selectProduct)
    const { mobileSize, headers } = useResponsive()
    const {
        handleSelectionCheckBox,
        handleRowClick,
        handleCellClick,
        handleCrrection,
        handleCopy,
        handleUpdateNewDtm,
        handleDeleteProd,
    } = useProductActions(selectProduct)

    return (
        <>
            <HeaderSection
                mobileSize={mobileSize}
                handleInputChange={handleInputChange}
            />
            <Container>
                {!mobileSize && (
                    <>
                        <FilterSection
                            handleRangeChange={handleRangeChange}
                            codeItems={codeItems}
                            handleChangeSelector={handleChangeSelector}
                        />
                        <ButtonSection
                            handleCrrection={handleCrrection}
                            handleCopy={handleCopy}
                            handleUpdateNewDtm={handleUpdateNewDtm}
                            handleDeleteProd={handleDeleteProd}
                        />
                    </>
                )}
                <Grid
                    height={mobileSize ? '700px' : '650px'}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                    onselectionchange={handleSelectionCheckBox}
                    items={filteredData}
                    columns={headers}
                />
            </Container>
        </>
    )
}

export default Home
