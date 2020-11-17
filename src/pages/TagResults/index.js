import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap'
import { tagDict, servAddr } from '../../utils/consts'
import BookResult from '../../components/BookResult'

const TagResults = (props) => {

    const selected = props.location.state.selected

    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(getResult, [])

    function getResult() {
        let url = servAddr + `/breco/tag_result`
        const tags = selected.map((item) => item.value)
        const formData = new FormData()
        formData.append('tags', JSON.stringify(tags))

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            setResult(res.results)
            setIsLoading(false)
        })
    }

    return (
        <div>
            <Navbar bg="info" className="" expand="lg" className="justify-content-center">
                <Nav>
                    {
                        selected.map((item, idx) => {
                            return <Nav.Item key={idx} className="ml-3 text-white"> {item.value} ({tagDict[item.type]}) </Nav.Item>
                        })
                    }
                </Nav>
            </Navbar>
            <Container className="col-12 col-md-6 mx-auto" style={{marginTop: '5vh'}}>
                <Container className="mt-5 col-12">
                    { isLoading ? 
                    <Spinner animation="grow" variant="primary" /> :
                    result.map((item, idx) => {
                        return <BookResult key={idx} details={item} />
                    }) }
                </Container>
            </Container>
        </div>
    )
}

export default TagResults