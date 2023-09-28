import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import { useEffect, useState } from "react"
import axiosClient from "../axios-client"


export default function DefaultLayout() {

    const { user, token, setUser, setToken, notification } = useStateContext()

    if (!token) {
        
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {

        e.preventDefault()

        axiosClient.post('/logout')
            .then(() => {

                setUser({})
                setToken(null)
            }).catch((e) => {

                console.log(e)
            })
    }

    useEffect(() => {

        axiosClient.get('/user')
            .then(({data}) => {

                setUser(data)
            }).catch((e) => {

                console.log(e)
            })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">
                    Dashboard
                </Link>
                <Link to="/users">
                    Users
                </Link>
            </aside>

            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        { user.name }
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

            
            { 
                notification && (
                    <div className="notification animated fadeInDown">
                        { notification }
                    </div>
                )
            }
        </div>
    )
}