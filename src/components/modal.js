
import { useModal } from "../hooks/useModal"
import "./components.css"

export const Modal = ({userId, onClose}) => {

    const {userData, modalLoading, isOpen, openModal, closeModal} = useModal(userId)

    console.log(userData)

    const getValue = (key) => {
        return userData[key] ?? "-"
    };

    console.log(getValue("password"))

    if (modalLoading) {
        return <h2>Загрузка...</h2>
    }

    return(
        <div className={`overlay ${isOpen ? "show" : "hide"}`} onClick={onClose}>
            <div className="modal">
            Модальное окно крутое{userData["firstName"]}
            <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    )
}
// ФИО, возраст, поля адреса, рост, вес, номер телефона, email и аватар
//firstName, lastName, maidenName, address, {city, state, stateCode, postalCode, coordinates {lat, lng} country}, height, weight, phone, email, 