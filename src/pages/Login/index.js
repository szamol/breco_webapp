import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { servAddr } from '../../utils/consts'
import { isLogged } from '../../utils/auth'

const Login = () => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("")

    function handleChange(event) {
        const value = event.target.value
        setUserInput({
            ...userInput,
            [event.target.id]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        let url = servAddr + "/auth/login"
        let formData = new FormData()
        formData.append('username', userInput['username'])
        formData.append('password', userInput['password'])
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("access_token", res.token)
            localStorage.setItem("user", res.user)
            localStorage.setItem("role", res.role)
            if (isLogged()) {
                window.location.replace("/")
            } else {
                setErrorMessage(res.msg)
            }
        })

    }

    return (
        <div className="text-center">
            <Container className="col-10 col-md-6 border p-5" style={{marginTop: '15vh'}}>
                {
                    errorMessage &&
                    <h3 className="text-danger">{errorMessage}</h3>
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Nazwa użytkownika</Form.Label>
                        <Form.Control className="text-center" type="text" onChange={handleChange} value={userInput.username || ''} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control className="text-center" type="password" onChange={handleChange} value={userInput.password || ''} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Zaloguj</Button>
                </Form>
            </Container>
            <p className="mt-1">Nie posiadasz konta? <Link to="/register">Zarejestruj się!</Link></p>
        </div>
    )
}

export default Login