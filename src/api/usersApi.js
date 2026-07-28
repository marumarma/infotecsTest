const baseUrl = "https://dummyjson.com/users"

export const getUsers = async (sortBy, order, limit, page, filter, filterValue) => {

    const params = new URLSearchParams()
    params.append("limit", limit)
    params.append("skip", (page-1) * limit)

    if (sortBy) {
        params.append("sortBy", sortBy)
        params.append("order", order)
    }

    let currentUrl = baseUrl
    if (filter && filterValue) {
        currentUrl = `${baseUrl}/filter`
        params.append("key", filter)
        params.append("value", filterValue)
    }
    const response = await fetch(`${currentUrl}?${params.toString()}`)

    if (!response.ok) {
        throw new Error("Ошибка")
    }
    const data = await response.json()

    return data
};

