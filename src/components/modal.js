
import { useModal } from "../hooks/useModal"

export const Modal = ({userId, onClose}) => {

    const {userData, modalLoading} = useModal(userId)

    console.log(userData)

    const getValue = (key) => {
        return userData[key] ?? "-"
    };

    console.log(getValue("password"))

    if (modalLoading) {
        return <h2>Загрузка...</h2>
    }

    return(
        <div style={{background: "cyan"}}>
            Модальное окно крутое
            {userData["firstName"]}
        </div>
    )
}
// ФИО, возраст, поля адреса, рост, вес, номер телефона, email и аватар
//firstName, lastName, maidenName, address, {city, state, stateCode, postalCode, coordinates {lat, lng} country}, height, weight, phone, email, 