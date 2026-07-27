import { useEffect, useState } from "react"
import { getUsers } from "../api/usersApi"

const defaultState = {
    page: 1,
    limit: 10,
    sortBy: "",
    order: "asc"
}

export const useSorting = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [tableState, setTableState] = useState(defaultState)

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true)
                const data = await getUsers(tableState.sortBy, tableState.order, tableState.limit, tableState.page)
                setUsers(data.users)
                setTotal(data.total)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadUsers()
        //не убир
    }, [tableState])

    const changeSort = (field) => {
    setTableState((prev) => {
        if (prev.sortBy !== field) {
            return {
                ...prev,
                sortBy: field,
                order: "asc",
                page: 1
            }
        }

        if (prev.order === "asc") {
            return {
                ...prev,
                order: "desc",
                page: 1
            }
        }

        return {
            ...prev,
            sortBy: "",
            order: "asc",
            page: 1
        }
    })
    }

    const changePage = (page) => {
        setTableState(prev => ({
            ...prev,
            page
        }));
    };

    const changeLimit = (limit) => {
        setTableState(prev => ({
            ...prev,
            limit,
            page: 1,
        }));
    };

    return {
        users,
        loading,
        totalPages: Math.ceil(total / tableState.limit),
        tableState,
        changeSort,
        changePage,
        changeLimit
    }
}
