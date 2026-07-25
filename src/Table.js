
import { useState, useEffect } from 'react';
import './App.css';

const Table = ()  => {

    const [data, setData] = useState([])
    const Columns = [
        {key: "lastName", label : "Фамилия"},
        {key: "firstName", label: "Имя"},
        {key: "maidenName", label: "Отчество"},
        {key: "gender", label: "Пол"},
        {key: "phone", label : "Телефон"},
        {key: "email", label : "E-mail"},
        {key: "country", label : "Страна"},
        {key: "city", label : "Город"}
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users')
            

            const result = await response.json()
            setData(result.users)
            console.log(result)
        } catch (err){
            console.error('Ошибка', err)
            }
        }
         fetchData()
    }, [])


  const getValue = (user, key) => {
    if (key === 'country') return user.address?.country || '-';
    if (key === 'city') return user.address?.city || '-';
    return user[key] || '-';
  };

  return (
    <div className="Table">
        <table>
            <thead>
                {Columns.map((column, idx) => (<th key = {idx}>{column.label}</th>))}
            </thead>
            <tbody>
                {data.map((user, rowidx) => (<tr key ={user.id || rowidx}>
                    {Columns.map((column, cellidx) => (
                        <td key = {cellidx}>{getValue(user, column.key)}</td>
                    ))}
                </tr>))}
            </tbody>
        </table>
    </div>
  );
}

export default Table;
