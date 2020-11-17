import React, { useState, useEffect } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import { servAddr } from '../../utils/consts'
const EditBook = (props) => {

    const isbn = props.location.state.isbn
    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(getResult, [])

    function getResult() {
        let url = servAddr + `/admin/get_book_request?isbn=${isbn}`

        fetch(url)
        .then(res => res.json())
        .then(res => {
            setResult(res.result[0])
            setIsLoading(false)
        })
    }

    function handleChange(e) {
        const value = e.target.value
        setResult({
            ...result,
            [e.target.name]: value
        })
    }

    function handleImageChange(e) {
        e.preventDefault()
        setResult({
            ...result,
            coverImg: e.target.files[0],
            cover: isbn + ".jpg"
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        let url = servAddr + "/admin/accept_book"
        
        let data = new FormData()
        for ( let prop in result ) {
            data.append(prop, result[prop])
        }
        fetch(url, {
            method: 'POST',
            body: data
        })
        .then(res => res.json())
        .then(res => {
            if (res.msg === "ok") window.location.href = "/admin/approve_books"
        })
    }

    return (
        <Container className="col-10 col-md-6" style={{marginTop: '15vh'}}>
            {
                !isLoading &&
                <Form>
                    <Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Tytuł</Form.Label>
                            <Form.Control 
                             type="text" 
                             name="title" 
                             onChange={handleChange} 
                             value={result.title} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control 
                             type="text"
                             name="isbn" 
                             disabled
                             value={result.isbn} />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Dodano przez</Form.Label>
                            <Form.Control 
                             type="text"
                             name="addedBy" 
                             disabled
                             value={result.addedBy} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Opis</Form.Label>
                        <Form.Control 
                         as="textarea" 
                         rows={3} 
                         placeholder="Opisz książkę w przynajmniej 3 zdaniach..."
                         name="description" 
                         onChange={handleChange} 
                         value={result.description} />
                    </Form.Group>
                    
                    <Form.Row className="mt-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Okładka książki</Form.Label>
                            <Form.File 
                             label={result.coverImg === undefined ? "Załaduj okładkę..." : result.coverImg.name}
                             name="cover"
                             data-browse="Przeglądaj"
                             onChange={handleImageChange}
                             accept="image/jpg"
                             custom />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Liczba Stron</Form.Label>
                            <Form.Control 
                             type="text"
                             name="pagesNum" 
                             onChange={handleChange} 
                             value={result.pages} />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Rok Wydania</Form.Label>
                            <Form.Control 
                             type="text"
                             name="year" 
                             onChange={handleChange} 
                             value={result.year} />
                        </Form.Group>
                    </Form.Row>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="success" size="lg" onClick={handleSubmit}>Akceptuj</Button>
                    </div>
                </Form>
            }
        </Container>
    )
}

export default EditBook