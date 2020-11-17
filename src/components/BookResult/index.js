import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { tagDict, servAddr } from '../../utils/consts'

const BookResult = (props) => {
    return (
        <Row className="mb-5">
            <Card className="w-100 p-3 text-left" border="secondary">
                <Row>
                    <Col md="4">
                    <Card.Img 
                        src={servAddr + "/static/covers/" + props.details.cover} 
                        style={{ height: '200px', width: '120px'}} 
                        className="border" />
                    </Col>
                    <Col md="4">
                        <Card.Body>
                            <Link to={`/details/${props.details.isbn}`}>
                                <Card.Title>{props.details.title}</Card.Title>
                            </Link>
                            <Card.Subtitle>{props.details.author}</Card.Subtitle>
                            <br/>
                            <Card.Text className="justify-content-between">
                                <span className="mr-5 text-success">+ {props.details.plus}</span>
                                <span className="text-danger">- {props.details.minus}</span>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                    <Col md="4">
                        <Card.Body className="justify-content-between">
                                {
                                    props.details.tags ?
                                    <ul>
                                        {props.details.tags.map((item, idx) => {
                                            return <li key={idx}>{item[0]} ({tagDict[item[1]]})</li>
                                        })}
                                    </ul> :
                                    <div>{props.details.description.slice(0,120) + "..."}</div>
                                }
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}

export default BookResult