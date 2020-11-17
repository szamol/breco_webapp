import React, { useEffect, useState } from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'
import RankingPage from './RankingPage'
import { servAddr } from '../../utils/consts'
const Ranking = () => {

    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(getResults, [])

    function getResults() {
        let url = servAddr + `/breco/ranking`
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setResult(res.rankings)
            setIsLoading(false)
        })
    }

    return (
        <Container className="col-10 col-md-6 text-center p-5">
            <h3>Ranking</h3>
            { !isLoading &&
            <Tabs defaultActiveKey="books" fill>
                <Tab eventKey="authors" title="Autorzy">
                    <RankingPage details={result.authors} />
                </Tab>
                <Tab eventKey="books" title="Książki">
                    <RankingPage details={result.books} />
                </Tab>
                <Tab eventKey="genres" title="Gatunki">
                    <RankingPage details={result.genres} />
                </Tab>
                <Tab eventKey="users" title="Użytkownicy">
                    <RankingPage details={result.users} />
                </Tab>
            </Tabs>
            }
        </Container>
    )
}

export default Ranking