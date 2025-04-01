import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AlertType } from 'types/alert.type'

export const useAlert = ({ icon, title, text }: AlertType) => {
    const MySwal = withReactContent(Swal)

    function open(callback?: any) {
        MySwal.fire({
            icon: icon,
            title: title,
            html: text, // text 대신 html을 사용하여 HTML을 렌더링
            confirmButtonText: 'OK',
            confirmButtonColor: '#429f50',
        }).then(() => {
            if (callback) {
                callback()
            }
        })
    }

    async function confirm(callback?: any): Promise<any> {
        return MySwal.fire({
            icon: icon,
            title: title,
            html: text, // text 대신 html을 사용하여 HTML을 렌더링
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            confirmButtonColor: '#429f50',
            cancelButtonColor: '#d33',
        }).then(() => {
            if (callback) {
                callback()
            }
        })
    }

    return {
        open,
        confirm,
    }
}
