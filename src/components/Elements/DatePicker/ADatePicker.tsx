import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ko } from 'date-fns/locale'
import DatePicker, { DatePickerProps } from 'react-datepicker'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Wrapper, IconContainer } from './ADatePicker.styles'
import { DateProps } from 'types/aDatePicker.type'
import 'react-datepicker/dist/react-datepicker.css'

const StyledDatePicker = styled(({ className, ...props }: DatePickerProps) => (
    <DatePicker className={className} {...props} />
))`
    width: 100%;
    height: 42px;
    padding: 8px 12px;
    padding-right: 40px;
    border: 2px solid #000;
    border-radius: 8px;
    font-size: 16px;
    color: #000;
    background-color: white;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        border-color: #555;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    &:hover {
        border-color: #333;
    }
`

const ADatePicker: React.FC<DateProps> = ({ onChange }) => {
    const [startDate, setStartDate] = useState<Date>(new Date())

    const handleChangeDate = (date: Date | null) => {
        if (date) {
            setStartDate(date)
            onChange?.(date)
        }
    }

    return (
        <Wrapper>
            <StyledDatePicker
                locale={ko}
                dateFormat="yyyy.MM.dd"
                dateFormatCalendar="yyyy.MM"
                selected={startDate}
                onChange={date => handleChangeDate(date)}
                calendarClassName="custom-calendar"
            />
            <IconContainer>
                <FontAwesomeIcon icon={faCalendarDays} />
            </IconContainer>
        </Wrapper>
    )
}

export default ADatePicker
