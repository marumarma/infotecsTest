
import { useState } from 'react';
import { useSorting } from "../hooks/useSorting.js"
import { Modal } from './modal.js';
import '../App.css';
import "../components/components.css"
import { FiltersInput } from './filters.js';

const Table = ()  => {

    const Columns = [
        {key: "lastName", label : "Фамилия", sortable: true},
        {key: "firstName", label: "Имя", sortable: true},
        {key: "maidenName", label: "Отчество", sortable: true},
        {key: "age", label: "Возраст", sortable: true},
        {key: "gender", label: "Пол", sortable: true},
        {key: "phone", label : "Телефон", sortable: true},
        {key: "email", label : "E-mail", sortable: false},
        {key: "country", label : "Страна", sortable: false},
        {key: "city", label : "Город", sortable: false}
    ]

    const [seletedUserId, setSelectedUserId] = useState(null)

    const {users, loading, tableState, totalPages, changeSort, changePage, changeFilterValue} = useSorting()

    const handleCloseModal = () => {
        setSelectedUserId(null)
    }

    const getValue = (user, key) => {
        if (key === "country") 
            return user.address?.country ?? "-"
        if (key === "city") 
            return user.address?.city ?? "-"
        return user[key] ?? "-"
    };

    const pickArrow = (key) => {
        if (tableState.sortBy !== key) return ""
        return tableState.order=== "asc" ? " ▲" : " ▼"
    };

    if (loading) {
        return <h2>Загрузка...</h2>
    }

  return (
    <div className='container'>
        <h3>Кликните на название столбца, чтобы отсортировать. Кликните еще раз, чтобы изменить параметры сортировки.</h3>
        <FiltersInput changeFilterValue={changeFilterValue} currentFilter={tableState.filter} currentFilterValue={tableState.filterValue}></FiltersInput>
        <table className='Table'>
            <thead>
                {Columns.map((column) => (<th key = {column.key} 
                onClick = {() => column.sortable && changeSort(column.key)} 
                className = {column.sortable ? 'sortable' : ''}>
                    {column.label}{column.sortable && pickArrow(column.key)}
                </th>))}
            </thead>
            <tbody>
                {users.map((user, idx) => (<tr className={`table-row ${idx%2 === 0 ? "white" : "pink"}`} key ={user.id} onClick={() => setSelectedUserId(user.id)}>
                    {Columns.map((column) => (
                        <td key = {column.key} className='cell'>{getValue(user, column.key)}</td>
                    ))}
                </tr>))}
            </tbody>
        </table>
            <div className="pagination">
                <button disabled={tableState.page === 1}
                    onClick={() => changePage(tableState.page - 1)}
                >Назад</button>
                <span>{tableState.page} / {totalPages}</span>
                <button
                    disabled={tableState.page === totalPages}
                    onClick={() => changePage(tableState.page + 1)}
                >Вперед</button>
            </div>
            {seletedUserId && <Modal userId={seletedUserId} onClose={handleCloseModal}></Modal> }
            
    </div>
  );
}

export default Table;
