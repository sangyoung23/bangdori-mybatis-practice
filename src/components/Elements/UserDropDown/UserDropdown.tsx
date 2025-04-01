import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'api/Session'
import { useAlert } from 'components/Elements/Alert/Alert'
import { useNavigate } from 'react-router-dom'
import {
    DropdownContainer,
    UserProfileImage,
    DropdownMenu,
    DropdownItem,
    ItemIcon,
    ItemText,
    UserInfo,
    UserDetails,
    UserName,
    UserEmail,
} from './UserDropdown.styles'
import userImg from 'assets/img/monkey.jpg'
import AModal from 'components/Elements/AModal/AModal'
import AInput from 'components/Elements/AInput/AInput'
import { useAxios } from 'api/Axios'

interface UserUpdateForm {
    userNo: number
    name: string
    phoneNo: string
    pwd: string
}

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [pwd, setPwd] = useState('')
    const [name, setName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')

    const { getSession, clearSession } = useSession()
    const { post } = useAxios()

    const { open } = useAlert({
        icon: 'success',
        title: '알림',
        text: '로그아웃 되었습니다.',
    })

    const { open: successUptUser } = useAlert({
        icon: 'success',
        title: '알림',
        text: '회원정보가 변경 되었습니다.',
    })

    const dropdownRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const user = {
        name: getSession('username'),
        id: getSession('userId'),
        avatar: userImg,
    }

    const handleProfileClick = () => {
        setModalOpen(true)
    }

    const handleCloseModal = (close: boolean) => {
        setModalOpen(close)
    }

    const handleLogout = () => {
        open(() => {
            clearSession()
            navigate('/')
        })
    }

    const handleChangePwd = (value: string) => {
        setPwd(value)
    }

    const handleChangeName = (value: string) => {
        setName(value)
    }

    const handleChangePhoneNo = (value: string) => {
        setPhoneNo(value)
    }

    const handleUserFormSave = async () => {
        const response = await post<UserUpdateForm>(
            '/api/user/update/userInfo',
            {
                userNo: getSession('userNo'),
                name: name,
                phoneNo: phoneNo,
                pwd: pwd,
            },
        )

        if (response.valid) {
            successUptUser(() => {
                clearSession()
                navigate('/')
            })
        }
    }

    return (
        <>
            {!modalOpen && (
                <DropdownContainer ref={dropdownRef}>
                    <UserProfileImage
                        src={user.avatar}
                        alt={user.name}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    <DropdownMenu modalOpen={modalOpen} isOpen={isOpen}>
                        <UserInfo>
                            <UserProfileImage
                                src={user.avatar}
                                alt={user.name}
                                style={{
                                    width: '48px',
                                    height: '40px',
                                }}
                            />
                            <UserDetails>
                                <UserName>{user.name}</UserName>
                                <UserEmail>{user.id}</UserEmail>
                            </UserDetails>
                        </UserInfo>
                        <DropdownItem onClick={handleProfileClick}>
                            <ItemIcon>
                                <FontAwesomeIcon icon={faUser} />
                            </ItemIcon>
                            <ItemText>회원 정보 수정</ItemText>
                        </DropdownItem>
                        <DropdownItem onClick={handleLogout}>
                            <ItemIcon>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </ItemIcon>
                            <ItemText>로그아웃</ItemText>
                        </DropdownItem>
                    </DropdownMenu>
                </DropdownContainer>
            )}
            <AModal
                title="회원 정보 수정"
                value={modalOpen}
                onClose={handleCloseModal}
                onSave={handleUserFormSave}
            >
                <AInput
                    onChange={handleChangePwd}
                    label="비밀번호"
                    type="password"
                    iconType="password"
                    width="100%"
                    mb="13px"
                    placeholder="변경할 비밀번호를 입력 해주세요."
                />
                <AInput
                    onChange={handleChangeName}
                    label="이름"
                    type="text"
                    iconType="name"
                    width="100%"
                    mb="13px"
                    placeholder="변경할 이름을 입력 해주세요."
                />
                <AInput
                    onChange={handleChangePhoneNo}
                    label="핸드폰 번호"
                    type="text"
                    iconType="phone"
                    width="100%"
                    placeholder="변경할 핸드폰 번호를 입력 해주세요."
                />
            </AModal>
        </>
    )
}

export default UserDropdown
