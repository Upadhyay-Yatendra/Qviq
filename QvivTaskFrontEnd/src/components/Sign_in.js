import React from 'react'
import Nav_bar from './Nav_bar'
import Foot from './Foot'
import { Link, useNavigate } from 'react-router-dom'
import Alertmst from './Alertmst'
import { useState } from 'react'
import Background from './Background'
import { Oval } from 'react-loader-spinner'
import obj from '../url'

function Sign_in(props) {
    const navigate = useNavigate()
    const backend_url = obj.backend_url
    const [user, setUser] = useState({
        'username': '',
        'password': '',
    })
    const [msg, setMsg] = useState("")
    const [showLoader, setShowLoader] = useState(false)
    function handleInput(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        // console.log(user)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        // console.log("yes")
        // Submit data to backend
        setShowLoader(true)
        const response = await fetch(`${backend_url}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'username': user.username,
                'password': user.password
            }),
        }).catch(error => {
            console.log(error)
        })
        const data = await response.json();
        // console.log(data)
        if (data.error) {
            if (data.error === 'Validation error')
                setMsg("Input Values are not appropriate")
            else if (data.error === 'invalid user')
                setMsg("User does not exist")
            else if (data.error === 'invalid password')
                setMsg("Incorrect Password")
        } else {
            props.setAuthToken(data.authToken)
            localStorage.setItem("authtoken", data.authToken);
            setMsg('')
            setShowLoader(false)
            navigate('/')
        }
        setShowLoader(false)

    }


    return (
        <>
            <Nav_bar authToken={props.authToken} setAuthToken={props.setAuthToken} />
            <Alertmst msg={msg} setMsg={setMsg} />
            <Background />
            <div className="form-container">
                <p className="title">Login</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="Username" required value={user.username} onChange={handleInput} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" required value={user.password} onChange={handleInput} />
                        <div className="forgot">
                        </div>
                    </div>
                    <button className="sign" type='submit'>
                        {showLoader ?
                            <Oval
                                height={25}
                                width={25}
                                color="black"
                                wrapperStyle={{}}
                                wrapperClass="loader_react"
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="grey"
                                strokeWidth={5}
                                strokeWidthSecondary={5}
                            /> : 'Sign in'}
                    </button>
                </form>
                <p className="signup">Do not have an account?
                    <Link rel="noopener noreferrer" to="/sign_up"> Sign up</Link>
                </p>
            </div>
            <Foot />
        </>
    )
}

export default Sign_in
