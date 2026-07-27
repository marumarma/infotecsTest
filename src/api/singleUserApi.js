import Table from "../Table";

const baseUrl = "https://dummyjson.com/users/"

export const getSingleUser = async (userId) => {

    const response = await fetch(`${baseUrl}/${userId}`)

    if (!response.ok) {
        throw new Error("Ошибка")
    }
    const data = await response.json()

    return data
};

