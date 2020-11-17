import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'

const TagInput = (props) => {

    const options = [
        ['Autor', 'Author'],
        ['Bohater', 'Character'],
        ['Czas', 'Times'],
        ['Element', 'Element'],
        ['Gatunek', 'Genre'],
        ['Grupa docelowa', 'Target'],
        ['Miejsce', 'Place']
    ]

    return (
        <Form.Row>
            <Form.Group as={Col} md="4">
                <Form.Label>Typ</Form.Label>
                <Form.Control 
                 as="select"
                 name="type"
                 defaultValue="default"
                 onChange={(e) => props.onChange(e, props.id)}>
                    <option value="default" disabled hidden>Wybierz typ</option>
                    {
                        options.map((item, idx) => <option key={idx} id={item[1]}>{item[0]}</option>)
                    }
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="7">
                <Form.Label>Wartość</Form.Label>
                <Form.Control 
                 type="text" 
                 name="value"
                 onChange={(e) => props.onChange(e, props.id)}/>
            </Form.Group>
            <Button variant='danger' onClick={(e) => props.onDelete(e, props.id)}>x</Button>
        </Form.Row>
    )
}

export default TagInput