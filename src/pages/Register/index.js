import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { servAddr } from '../../utils/consts'
const Register = () => {

    const [userInput, setUserInput] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [success, setSuccess] = useState(false)

    function handleChange(event) {
        const value = event.target.value
        setUserInput({
            ...userInput,
            [event.target.id]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        let url = servAddr + "/auth/register"
        
        let formData = new FormData()
        formData.append('username', userInput['username'])
        formData.append('email', userInput['email'])
        formData.append('password', userInput['password'])

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            if (res.msg === "SUCCESS") {
                setSuccess(true)
                setErrorMessage("")
            } else {
                setSuccess(false)
                setErrorMessage(res.msg)
            }
        })
    }

    function printError() {
        let arr = []
        for (let idx in errorMessage) {
            arr.push(<h5 key={idx} className="text-danger">{errorMessage[idx]}</h5>)
        }
        return arr
    }

    return (
        <Container className="col-10 col-md-6 text-center border p-5" style={{marginTop: '15vh'}}>
            {
                errorMessage && printError()
            }
            {
                success && 
                <h3 className="text-success">Pomyślnie zarejestrowano!</h3>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Nazwa użytkownika</Form.Label>
                    <Form.Control className="text-center" type="text" onChange={handleChange} value={userInput.username || ''} />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Adres E-mail</Form.Label>
                    <Form.Control className="text-center" type="email" onChange={handleChange} value={userInput.email || ''} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control className="text-center" type="password" onChange={handleChange} value={userInput.password || ''} />
                </Form.Group>
                <Button variant="primary" type="submit">Zarejestruj</Button>
            </Form>
        </Container>
    )
}

export default Register