import { useState, useEffect } from "react"
import { getSingleUser } from "../api/singleUserApi"

export const useModal = (userId) => {

    const [userData, setUserData] = useState([])
    const [modalLoading, setModalLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

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

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setUserData([])
    }


    return {
        userId,
        userData,
        modalLoading,
        isOpen,
        openModal,
        closeModal
    }
}