import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { tagDict, servAddr } from '../../../utils/consts'
import { getToken } from '../../../utils/auth'

const TagInputModal = (props) => {

    const [type, setType] = useState("")
    const [value, setValue] = useState([""])
    const [isSuccess, setIsSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])

    useEffect(() => {
        setType("")
        setValue([""])
        setIsSuccess(false)
        setErrMsg("")
        setIsLoading(false)
        setOptions([])
    }, [props.show])
    
    function handleTypeChange(e) {
        e.preventDefault()
        setType(e.target.selectedOptions[0].id)
    }

    function handleValueChange(query) {
        const rec = {}
        rec.value = query
        setValue([rec])
        if (type) {
            setIsLoading(true)
            let url = servAddr + `/breco/tag_autocomplete_with_type?q=${query}&type=${type}`
            fetch(url)
            .then(res => res.json())
            .then(res => {
                setOptions(res.results)
                setIsLoading(false)
            })
        }
    }

    function validateInput() {
        if (type === "") {
            setErrMsg("Typ tagu nie może być pusty!")
            return false
        } else if (value[0]['value'] === "") {
            setErrMsg("Warotść tagu nie może być pusta!")
            return false
        } 

        return true
    }

    function handleSubmit(e) {
        if (validateInput()) {
            let url = servAddr + "/breco/add_tag"
            let data = new FormData()
            const rec = {}
            rec[type] = value[0]['value']
            data.append('tagRequest', JSON.stringify(rec))
            data.append('isbn', props.isbn)
            fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    'x-access-tokens': getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                if (res.msg === "ok") {
                    setIsSuccess(true)
                    setErrMsg("")
                }
            })
        } else {
            setIsSuccess(false)
        }
    }

    function mock() {}

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Dodaj nowy tag do {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { isSuccess &&
                  <h5 className="text-success text-center">Tag zgłoszony. Dziękujemy!</h5>
                }
                {
                    errMsg &&
                    <h5 className="text-danger text-center">{errMsg}</h5>
                }
                <Form.Row>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Typ</Form.Label>
                        <Form.Control 
                        as="select"
                        name="type"
                        defaultValue="default"
                        onChange={handleTypeChange}>
                            <option value="default" disabled hidden>Wybierz typ</option>
                            {
                                Object.keys(tagDict).map((item, idx) => <option key={idx} id={item}>{tagDict[item]}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="7">
                        <Form.Label>Wartość</Form.Label>
                        <Typeahead
                            id="search-tag"
                            minLength={2}
                            options={options}
                            isLoading={isLoading}
                            onInputChange={handleValueChange}
                            onChange={setValue}
                            labelKey="value"
                            filterBy={() => true}
                            emptyLabel="Brak wyników..." />
                    </Form.Group>
                </Form.Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="success" size="lg" onClick={handleSubmit}>Dodaj</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TagInputModal