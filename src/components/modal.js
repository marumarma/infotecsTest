
import { useModal } from "../hooks/useModal"
import "./components.css"

const keys = ['firstName', "lastName", 'maidenName', "address", "height", "weight", "phone", "email"]
const addressKeys = ["address", "city", "coordinates", "country", "postalCode", "state", "stateCode"]
const labels = ["Имя: ", "Фамилия: ", "Отчество: ", "Адрес: ", "Город: ", "Координата 1: ", "Координата 2: ", "Страна: ", "Почтовый индекс: ", "Штат: ", "Код штата: ", "Рост: ", "Вес: ", "Телефон: ", "Email: "]

export const Modal = ({userId, onClose}) => {

    const {userData, modalLoading, isOpen, openModal, closeModal} = useModal(userId)

    console.log(userData)

    const getValue = (key) => {
        return userData[key] ?? "-"
    };

    console.log(getValue("password"))

    const measure = (columnKey) => {
        let measureUnit = ""
        if (columnKey === "height"){
            measureUnit = " sm"
        }
        if (columnKey === "weight"){
            measureUnit = " kg"
        }
        return measureUnit
    }

    const getStructuredData = () => {
        const data = []
        for (const key of keys) {
            if (key === "address"){
                for (const addressKey of addressKeys){
                    if (addressKey === "coordinates"){
                        data.push(userData[key][addressKey].lat)
                        data.push(userData[key][addressKey].lng)
                    }
                    else{
                        data.push(userData[key][addressKey])
                    }
                }
            }
            else{
                console.log(userData[key])
                data.push(`${userData[key]}${measure(key)}`)
            }
        }

        return data;
    }

    return(
        <div>
            {modalLoading ? <div className={`overlay ${isOpen ? "" : "hide"}`}><h2 className="modal">Загрузка...</h2></div> : 
                <div className={`overlay ${isOpen ? "" : "hide"}`} onClick={onClose}>
                    <div className="modal">
                        <div className="modal-container">
                            <img className="avatar" src="https://images.meme-arsenal.com/e95f2a7f45591bd4c8081421769dc4e8.jpg"></img>
                            <div className="modal-data-container">
                                {getStructuredData().map((dataUnit, idx) => (<div className="modal-row">{labels[idx]}{dataUnit}</div> ))}
                            </div>
                        </div>
                        <button onClick={onClose} className="modal-button">Закрыть</button>
                    </div>
                </div>
            }

        </div>
    )
}

//{keys.map((key) => (<div>{userData[key]}</div>))}
// ФИО, возраст, поля адреса, рост, вес, номер телефона, email и аватар
//firstName, lastName, maidenName, address, {city, state, stateCode, postalCode, coordinates {lat, lng} country}, height, weight, phone, email, 