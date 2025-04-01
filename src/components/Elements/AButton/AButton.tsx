import { Button } from './AButton.styles'
import { AButtonPropsType } from 'types/aButton.type'

const AButton = ({
    type,
    children,
    disabled,
    mr,
    width,
    onClick,
}: AButtonPropsType) => {
    return (
        <Button
            type={type}
            width={width}
            mr={mr}
            disabled={disabled}
            onClick={event => onClick && onClick(event)}
        >
            {children}
        </Button>
    )
}

export default AButton
