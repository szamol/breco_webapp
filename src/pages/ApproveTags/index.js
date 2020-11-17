import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Container, Button } from 'react-bootstrap'
import { tagDict, servAddr } from '../../utils/consts'
const ApproveTags = () => {

    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(getResults, [])

    function getResults() {
        let url = servAddr + "/admin/get_unapproved_tags"
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setResults(res.results)
            setIsLoading(false)
        })
    }

    function handleReject(e, id, isbn) {
        e.preventDefault()
        let url = servAddr + "/admin/reject_tag"
        let formData = new FormData()
        formData.append('id', id)
        formData.append('isbn', isbn)
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => {
            setIsLoading(true)
            getResults()
        })
    }

    function handleAccept(e, id, isbn) {
        e.preventDefault()
        let url = servAddr + "/admin/accept_tag"
        let formData = new FormData()
        formData.append('id', id)
        formData.append('isbn', isbn)
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => {
            setIsLoading(true)
            getResults()
        })
    }

    return(
        <Container className="col-10 col-md-6 text-center p-5">
            {
                !isLoading && 
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Wartość</th>
                        <th>Typ</th>
                        <th>Książka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{item.id}</td>
                                        <td>{item.value}</td>
                                        <td>{tagDict[item.type]}</td>
                                        <td>{item.title}</td>
                                        <td><Button variant="success" onClick={(e) => handleAccept(e, item.id, item.isbn)}>Akceptuj</Button></td>
                                        <td><Button variant="danger" onClick={(e) => handleReject(e, item.id, item.isbn)}>Odrzuć</Button></td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </Table>
            }
        </Container>
    )
}

export default ApproveTags