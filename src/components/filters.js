
import { useState, useEffect } from "react"
import "./components.css"
    const Columns = [
        {key: "lastName", label : "Фамилия", sortable: true},
        {key: "firstName", label: "Имя", sortable: true},
        {key: "maidenName", label: "Отчество", sortable: true},
        {key: "age", label: "Возраст", sortable: true},
        {key: "gender", label: "Пол", sortable: true},
        {key: "phone", label : "Телефон", sortable: true},
        {key: "email", label : "E-mail", sortable: false},
        {key: "address.city", label : "Город", sortable: false}
    ]
export const FiltersInput = ({changeFilterValue, currentFilter, currentFilterValue}) => {

    const [field, setField] = useState(currentFilter || "")
    const [value, setValue] = useState(currentFilterValue || "")

    useEffect(() => {
        if (currentFilter !== undefined) {
            setField(currentFilter || "")
        }
    }, [currentFilter])

    useEffect(() => {
        if (currentFilterValue !== undefined) {
            setValue(currentFilterValue || "")
        }
    }, [currentFilterValue])

    const applyFilter = () => {
        changeFilterValue(field, value)
    }

    const clearFilter = () => {
        setField("")
        setValue("")
        changeFilterValue("", "")
    }

    return(
        <div className="filter-input">
            <select value={field} onChange={(e) => setField(e.target.value)}>
                <option value="">Выберите столбец...</option>
                {Columns.map((column) => (<option key={column.key} value={column.key}>{column.label}</option>))}
            </select>
            <input placeholder="Введите значение..." value={value} onChange={(e) => setValue(e.target.value)}></input>
            <button onClick={applyFilter}>Применить</button>
            <button onClick={clearFilter}>Сбросить фильтр</button>
        </div>
    )
}
