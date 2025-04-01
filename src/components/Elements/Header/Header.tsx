import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavBars, PageDiv, EmptyDiv, Img } from './Header.styles'
import { HeaderProps } from 'types/header.type'
import logo2 from 'assets/img/bangdoriLogo.png'
import AInput from 'components/Elements/AInput/AInput'
import UserDropdown from 'components/Elements/UserDropDown/UserDropdown'

const Header: React.FC<HeaderProps> = ({ handleInputChange }) => {
    const location = useLocation()

    const searchInputPages = ['/home', '/map']

    const styles = {
        icon: {
            paddingRight: '10px',
            color: '#007bff',
            fontSize: '24px',
            marginRight: '25px',
        },
        link: {
            textDecoration: 'none',
            color: '#333',
            fontWeight: '500',
            fontSize: '16px',
        },
    }

    return (
        <NavBars>
            <EmptyDiv>
                <Link style={styles.link} to="/home">
                    <Img src={logo2} alt="로고" />
                </Link>
                {searchInputPages.includes(location.pathname) && (
                    <AInput
                        onChange={handleInputChange}
                        type="text"
                        iconType="search"
                        width="300px"
                    />
                )}
                <PageDiv>
                    <Link style={styles.link} to="/home">
                        매물관리
                    </Link>
                    <Link style={styles.link} to="/map">
                        맵검색
                    </Link>
                    <Link style={styles.link} to="/product/registration">
                        매물등록
                    </Link>
                    <Link style={styles.link} to="/bargain/registration">
                        매매등록
                    </Link>
                    <Link style={styles.link} to="/rent/registration">
                        임대등록
                    </Link>
                </PageDiv>
            </EmptyDiv>
            <UserDropdown />
        </NavBars>
    )
}

export default Header
