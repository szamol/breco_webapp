import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
const NotFound = () => {
    return (
        <Container className="col-10 col-md-6 text-center" style={{marginTop: '10vh'}}>
            <h1>Nie znaleziono takiej strony :(</h1>
            <h5>Przejdź do breco korzystając z poniższego przycisku:</h5>
            <Button className="mt-2" as={NavLink} variant="primary" to="/">Wracamy!</Button>
        </Container>
    )
}

export default NotFound