
import { useState, useEffect } from 'react';
import { useSorting } from "./hooks/useSorting.js"
import { Modal } from './components/modal.js';
import './App.css';
import { useModal } from './hooks/useModal.js';

const Table = ()  => {

    const Columns = [
        {key: "lastName", label : "Фамилия", sortable: true},
        {key: "firstName", label: "Имя", sortable: true},
        {key: "maidenName", label: "Отчество", sortable: true},
        {key: "age", label: "Возраст", sortable: true},
        {key: "gender", label: "Пол", sortable: true},
        {key: "phone", label : "Телефон", sortable: true},
        {key: "email", label : "E-mail", sortable: true},
        {key: "country", label : "Страна", sortable: false},
        {key: "city", label : "Город", sortable: false}
    ]

    const [seletedUserId, setSelectedUserId] = useState(null)

    const {users, loading, tableState, totalPages, changeSort, changePage, changeLimit} = useSorting()

    const {userId} = useModal()

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
    <div className="Table">
        <table>
            <thead>
                {Columns.map((column) => (<th key = {column.key} 
                onClick = {() => column.sortable && changeSort(column.key)} 
                className = {column.sortable ? 'sortable' : ''}>
                    {column.label}{column.sortable && pickArrow(column.key)}
                </th>))}
            </thead>
            <tbody>
                {users.map((user) => (<tr key ={user.id} onClick={() => setSelectedUserId(user.id)}>
                    {Columns.map((column) => (
                        <td key = {column.key}>{getValue(user, column.key)}</td>
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
            <Modal userId={seletedUserId}></Modal>
    </div>
  );
}

export default Table;
