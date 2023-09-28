import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"


export default function UserForm(){

    const navigate = useNavigate()

    const { id } = useParams()
    
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    if (id) {
        
        useEffect(() => {

            setLoading(true)

            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    
                    setLoading(false)
                    setUser(data)
            
                }).catch((e) => {

                    setLoading(false)
                    console.log('catch', e)
                })
        }, [])
    }

    const onSubmit = (e) => {
        
        e.preventDefault()

        if (user.id) {
            
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {

                    //TODO: show notification message
                    navigate('/users')
                }).catch(err => {
                        
                    const response = err.response

                    if (response?.status === 422) {
                        
                        setErrors(response.data.errors)
                    }
                })
        }else{

            axiosClient.post(`/users`, user)
                .then(() => {

                    //TODO: show notification message
                    navigate('/users')
                }).catch(err => {
                    
                    const response = err.response

                    if (response?.status === 422) {
                        
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {
                user.id && (
                    <h1>
                        Update user
                    </h1>
                )
            }
            {
                !user.id && (
                    <h1>
                        New User
                    </h1>
                )
            }

            <div className="card animated fadeInDown">

                {
                    loading && (
                        <div className="text-center">
                            Loading...
                        </div>
                    )
                }

                {
                    errors && (
                        <div className="errors alert">
                            {
                                Object.keys(errors).map((key) => (
                                    <p key={key}>{ errors[key][0] }</p>
                                ))
                            }
                        </div>
                    )
                }

                {
                    !loading && (
                        <form onSubmit={onSubmit}>

                            <input onChange={ e => setUser({ ...user, name: e.target.value}) } value={user.name} type="text" placeholder="Name"/>
                            <input onChange={ e => setUser({ ...user, email: e.target.value}) } value={user.email} type="email" placeholder="Email"/>
                            <input onChange={ e => setUser({ ...user, password: e.target.value}) } type="password" placeholder="Password"/>
                            <input onChange={ e => setUser({ ...user, password_confirmation: e.target.value}) } type="password" placeholder="Password confirmation"/>

                            <button className="btn">
                                Save
                            </button>
                        </form>
                    )
                }
            </div>
        </>
    )
}