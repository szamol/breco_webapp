import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { servAddr } from '../../utils/consts'
import BookResult from '../../components/BookResult'

const TitleResults = () => {

    const { q } = useParams()
    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(getResult, [])

    function getResult() {
        let url = servAddr + `/breco/title_result?q=${q}`
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setResult(res.results)
            setIsLoading(false)
        })
    }

    return (
        <div className="text-center">
            <Container className="col-12 col-md-6 mx-auto" style={{marginTop: '5vh'}}>
                <h3>Szukana fraza: <b>{q}</b></h3>
                <Container className="mt-5 col-12">
                    { isLoading ? 
                    <Spinner animation="grow" variant="primary" /> :
                    result.map((item, idx) => {
                        return <BookResult key={idx} details={item}/>
                    }) }
                </Container>
            </Container>
        </div>
    )
}

export default TitleResults