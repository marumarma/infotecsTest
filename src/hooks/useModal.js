import { useState, useEffect } from "react"
import { getSingleUser } from "../api/singleUserApi"

export const useModal = (userId) => {

    const [userData, setUserData] = useState([])
    const [modalLoading, setModalLoading] = useState(true)

    useEffect(() => {
        const loadUserData = async () => {
            try {
                setModalLoading(true)
                const data = await getSingleUser(userId)
                setUserData(data)
            } catch (err) {
                console.error(err)
            } finally {
                setModalLoading(false)
            }
        }
        loadUserData()
        //не убир
    }, [userId])

    return {
        userId,
        userData,
        modalLoading
    }
}