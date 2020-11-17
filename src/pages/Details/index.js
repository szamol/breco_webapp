import React, {useEffect, useState} from 'react'
import { Container, Spinner, Image, Col, Row, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { rateBook } from '../../utils/rating'
import { getToken } from '../../utils/auth'
import { servAddr, tagDict } from '../../utils/consts'
import Similars from './Similars'
import TagInputModal from './TagInputModal'

const Details = () => {

    const { isbn } = useParams() 
    const [result, setResult] = useState([])
    const [rate, setRate] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [modalShow, setModalShow] = useState(false)

    useEffect(getResult, [isbn])

    function getResult() {
        let url = servAddr + `/breco/details?isbn=${isbn}`
        fetch(url, {
            headers: {
                'x-access-tokens': getToken()
            }
        })
        .then(res => res.json())
        .then(res => {
            setResult(res.results)
            setRate(res.rate)
            setIsLoading(false)
        })
    }

    function handleRate(event) {
        let curr_rate = event.target.textContent
        rateBook(isbn, curr_rate)
        if (curr_rate === '+') {
            result.plus++
            if (rate === '-') result.minus--
            setRate('+')
        } else {
            result.minus++
            if (rate === '+') result.plus--
            setRate('-')
        }
    }
    
    return (
        <div>
            <Container className="col-12" style={{marginTop: '5vh'}}>
                <Container className="mt-5 col-12">
                    { isLoading ? 
                        <Spinner className="mx-auto" animation="grow" variant="primary" /> :
                        <>
                            <Row>
                                <Col md="2">
                                    <Image src={servAddr + "/static/covers/" + result.cover} 
                                        style={{ height: '300px', width: '200px'}} 
                                        className="border" rounded />
                                </Col>
                                <Col md="5">
                                    <h1>{result.title}</h1>
                                    <h4>{result.author}</h4>
                                    <h5>{result.isbn}</h5>
                                    <p>{result.description}</p>
                                    <b>
                                        <h5>Oceny:</h5>
                                        <span className="text-success mr-5">
                                            <Button variant="success" 
                                            style={{width: '3rem'}} 
                                            onClick={handleRate}
                                            disabled={rate === '+'}>+</Button> {result.plus}
                                        </span>
                                        <span className="text-danger">
                                            <Button variant="danger"
                                            style={{width: '3rem'}} 
                                            onClick={handleRate}
                                            disabled={rate === '-'}>-</Button> {result.minus}
                                        </span>
                                    </b>
                                </Col>
                                <Col md="5" className="mt-5">
                                    <h4>Cechy książki:</h4>
                                    <ul>
                                        {
                                            result.tags.map((item, idx) =>
                                        <li key={idx}><b>{item[0]}</b> ({tagDict[item[1]]})</li>)
                                        }
                                    </ul>
                                    <Button onClick={() => setModalShow(true)}>Dodaj nowy tag</Button>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-5">
                                <h3>Podobne:</h3>
                            </Row>
                            <Similars isbn={isbn}/>
                            <Row className="justify-content-center mt-5">
                                <h5>(Przyciski z cyframi informują o tym ile występuje podobieństw)</h5>
                            </Row>
                        </>
                    }

                </Container>
                <TagInputModal 
                    show={modalShow} 
                    onHide={() => setModalShow(false)} 
                    title={result.title} 
                    isbn={result.isbn} />
            </Container>
        </div>
    )
}

export default Details