import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"


export default function Login(){

    const emailRef = useRef()
    const passwordRef = useRef()

    const [errors, setErrors] = useState(null)

    const { setUser, setToken } = useStateContext()

    const onSubmit = (e) => {
            
        e.preventDefault()

        setErrors(null)

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload)
            .then(({ data }) => {

                setUser(data.user)
                setToken(data.token)
            }).catch((error) => {
            
                const response = error.response

                if (response && response.status === 422) { //validation error
                    
                    if (response.data.errors) {
                        
                        setErrors(response.data.errors)
                    }else{

                        setErrors({ email: [response.data.message]})
                    }
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>

                    <h1 className="title">
                        Login into your account
                    </h1>

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

                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />

                    <button className="btn btn-block">
                        Login
                    </button>

                    <p className="message">
                        Not registered? <Link to='/signup'>
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}