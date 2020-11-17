import React, { useState, useEffect } from 'react'

import { Container, Form, Button, Spinner } from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { Link } from 'react-router-dom'
import BookResult from '../../components/BookResult'
import { getToken } from '../../utils/auth'
import { servAddr } from '../../utils/consts'
const TitleSearch = () => {

    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])
    const [lastSeen, setLastSeen] = useState([])
    const [isLastSeenLoading, setIsLastSeenLoading] = useState(true) 

    useEffect(getResults, [])

    function getResults() {
        let url = servAddr + `/breco/get_last_seen`
        fetch(url, {
            headers: {
                'x-access-tokens': getToken()
            }
        })
        .then(res => res.json())
        .then(res => {
            setLastSeen(res.results)
            setIsLastSeenLoading(false)
        })
    }

    function handleSearch(query) {
        setIsLoading(true)
        setQuery(query)
        let url = servAddr + `/breco/title_autocomplete?q=${query}`
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setOptions(res.results)
            setIsLoading(false)
        })
    }

    function handleChange(text) {
        setQuery(text[0])
    }

    return (
        <div className="text-center">
            <Container className="col-10 col-md-6" style={{marginTop: '15vh'}}>
                <h4>W tej wyszukiwarce możesz znaleźć książkę po tytule:</h4>
                <Form>
                    <Form.Group controlId="title">
                        <AsyncTypeahead
                            id="search-title"
                            minLength={2}
                            options={options}
                            isLoading={isLoading}
                            onSearch={handleSearch}
                            onChange={handleChange}
                            filterBy={() => true}
                            emptyLabel="Brak wyników..."
                            value={query}
                        />
                    </Form.Group>
                    <Link to={`/title_results/${query}`}>
                        <Button variant="primary" type="submit" disabled={query.length <= 2}>Wyszukaj</Button>
                    </Link>
                </Form>
                { isLastSeenLoading ? 
                    <Spinner animation="grow" variant="primary" /> :
                    <div className="mt-5">
                        <h3>Ostatnio oglądane:</h3>
                        {
                            lastSeen.map((item, idx) => {
                                return <BookResult key={idx} details={item}/>
                            })
                        }
                    </div>
                }           
            </Container>
        </div>
    )
}

export default TitleSearch