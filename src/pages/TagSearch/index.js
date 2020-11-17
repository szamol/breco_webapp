import React, { useState, useEffect } from 'react'

import { Container, Form, Button, Spinner } from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { Link } from 'react-router-dom'

import BookResult from '../../components/BookResult'
import { tagDict, servAddr } from '../../utils/consts'
import { getToken } from '../../utils/auth'

const TagSearch = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState([])
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
        let url = servAddr + `/breco/tag_autocomplete?q=${query}`
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setOptions(res.results)
            setIsLoading(false)
        })
    }

    function handleChange(option) {
        setSelected(Array.from(new Set(option)))
    }

    return (
        <div className="text-center">
            <Container className="col-10 col-md-6" style={{marginTop: '15vh'}}>
                <h4>Wybieraj słowa kluczowe opisujące książkę, którą chcesz przeczytać...</h4>
                <Form>
                    <Form.Group controlId="tag">
                        <AsyncTypeahead
                            id="search-tag"
                            minLength={2}
                            options={options}
                            isLoading={isLoading}
                            onSearch={handleSearch}
                            onChange={handleChange}
                            labelKey="value"
                            filterBy={() => true}
                            emptyLabel="Brak wyników..."
                            multiple
                            clearButton
                            selected={selected}
                            renderMenuItemChildren={(option) => (
                                <div>
                                  {option.value}
                                  <div>
                                    <small>{tagDict[option.type]}</small>
                                  </div>
                                </div>
                              )}
                        />
                    </Form.Group>
                    <Link to={{pathname: "/tag_results", state: {selected: selected}}}>
                        <Button variant="primary" type="submit">Wyszukaj</Button>
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

export default TagSearch