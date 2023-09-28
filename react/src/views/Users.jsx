import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"


export default function Users(){

    const { setNotification } = useStateContext()

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
                setUsers(data.data)
        
            }).catch((e) => {

                setLoading(false)
                console.log('catch',e)
            })
    }

    const onDelete = (user) => {

        if(window.confirm(`Are you sure you want to delete ${user.name}?`)){

            axiosClient.delete(`/users/${user.id}`)
                .then(({data}) => {
                    
                    setNotification('User deleted successfully')
                    getUsers()
                }).catch((e) => {

                    console.log('catch',e)
                })
        }
    }

    return (
        <div>
            <div className="" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>

                <Link to="/users/new" className="btn-add">
                    Add new
                </Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
                        loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                        )
                    }

                    {
                        !loading && (
                            <tbody>
                                {
                                    users.map(u => (
                                            <tr key={ u.id }>
                                                <td>{ u.id }</td>
                                                <td>{ u.name }</td>
                                                <td>{ u.email }</td>
                                                <td>{ u.created_at }</td>
                                                <td>
                                                    <Link className="btn-edit" to={'/users/' + u.id}>
                                                        Edit
                                                    </Link>
                                                    &nbsp;
                                                    <button onClick={ e => onDelete(u) } className="btn-delete">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                    ))
                                }
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    )
}