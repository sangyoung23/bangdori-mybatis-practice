import React, { useEffect, useState } from 'react'
import DaumPostcode from 'react-daum-postcode'
import './post.css'
import AButton from '../AButton/AButton'

const Post = (props: {
    setProdValues: (arg0: any) => void
    company: any
    onClose: () => void
}) => {
    const { setProdValues, company, onClose } = props
    const [geocoder, setGeocoder] = useState<any>(null)

    const complete = (data: {
        address: string
        addressType: string
        bname: string
        buildingName: string
        zonecode: string
        jibunAddress: string
        roadAddress: string
    }) => {
        let fullAddress = data.address
        const jibunAddress = data.jibunAddress
        const roadAddress = data.roadAddress
        let extraAddress = ''

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname
            }
            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
        }

        geocoder.addressSearch(jibunAddress, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setProdValues({
                    ...company,
                    prodAddr: jibunAddress,
                    prodRoadAddr: roadAddress,
                    propertyX: result[0].y,
                    propertyY: result[0].x,
                })
            }
        })

        setProdValues({
            ...company,
            prodAddr: jibunAddress,
            prodRoadAddr: roadAddress,
        })

        onClose()
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const newGeocoder = new window.kakao.maps.services.Geocoder()
        setGeocoder(newGeocoder)
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <>
            <div className="modal-backdrop" />
            <div className="postmodal">
                <DaumPostcode onComplete={complete} />
                <div className="btnBox">
                    <AButton onClick={onClose}>닫기</AButton>
                </div>
            </div>
        </>
    )
}

export default Post
