import { useEffect, useState } from "react"
import axiosClient from "../axios-client"


export default function Users(){

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        getUsers()
    }, [])

    const getUsers = () => {

        setLoading(true)

        axiosClient.get('/users')
            .then(({data}) => {

                setLoading(false)
                setUsers(data)
            }).catch((e) => {

                setLoading(false)
                console.log(e)
            })
    }

    return (
        <div>
            Users
        </div>
    )
}