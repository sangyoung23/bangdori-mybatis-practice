import styled from '@emotion/styled'

export const DropdownContainer = styled.div`
    position: relative;
`

export const UserProfileImage = styled.img`
    width: 43px;
    height: 43px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    border: 2px solid #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 4px 15px rgba(0, 105, 255, 0.3);
    }
`

export const DropdownMenu = styled.div<{
    isOpen?: boolean
    modalOpen?: boolean
}>`
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 200px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    opacity: ${props => (props.modalOpen ? 0.9 : 1)};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transform: ${props =>
        props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
    z-index: 9999;
`

export const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #f5f5f5;
    }
`

export const ItemIcon = styled.div`
    margin-right: 14px;
    display: flex;
    align-items: center;
    color: #666;
`

export const ItemText = styled.span`
    font-size: 14px;
    color: #333;
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
`

export const UserDetails = styled.div`
    margin-left: 12px;
`

export const UserName = styled.div`
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
`

export const UserEmail = styled.div`
    font-size: 12px;
    color: #666;
`
