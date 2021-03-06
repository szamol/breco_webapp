import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { servAddr } from '../../utils/consts'
const ApproveBooks = () => {

    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(getResults, [])

    function getResults() {
        let url = servAddr + "/admin/get_unapproved_books"
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setResults(res.results)
            setIsLoading(false)
        })
    }

    function handleReject(e, isbn) {
        e.preventDefault()
        let url = servAddr + "/admin/reject_book"
        let formData = new FormData()
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
                        <th>ISBN</th>
                        <th>Tytuł</th>
                        <th>Dodano przez</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{item.isbn}</td>
                                        <td>{item.title}</td>
                                        <td>{item.addedBy}</td>
                                        <td>
                                            <Link to={{pathname: "/admin/edit_book", state: {isbn: item.isbn}}}>
                                                <Button variant="success">Edytuj</Button>
                                            </Link>
                                        </td>
                                        <td><Button variant="danger" onClick={(e) => handleReject(e, item.isbn)}>Odrzuć</Button></td>
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

export default ApproveBooks