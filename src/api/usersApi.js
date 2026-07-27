import Table from "../Table";

const baseUrl = "https://dummyjson.com/users"

export const getUsers = async (sortBy, order, limit, page) => {

    const params = new URLSearchParams()
    params.append("limit", limit)
    params.append("skip", (page-1) * limit)

    if (sortBy) {
        params.append("sortBy", sortBy)
        params.append("order", order)
    }
    const response = await fetch(`${baseUrl}?${params.toString()}`)

    if (!response.ok) {
        throw new Error("Ошибка")
    }
    const data = await response.json()

    return data
};

