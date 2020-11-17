import React, { useState } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import { getUser } from '../../utils/auth'
import { servAddr } from '../../utils/consts'
import TagInput from './TagInput'

const BookRequest = (props) => {

    const [formData, setFormData] = useState({
        title: '',
        isbn: '',
        description: '',
        pagesNum: '',
        year: '',
        tags: [],
        addedBy: getUser()
    })

    const [errMsg, setErrMsg] = useState("")

    function handleChange(e) {
        const value = e.target.value
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    function handleAddTag(e) {
        e.preventDefault()
        const tagArr = formData.tags
        tagArr.push({type: '', value: ''})
        setFormData({
            ...formData,
            tags: tagArr
        })
    }

    function handleTagDelete(e, id) {
        e.preventDefault()
        const tagArr = formData.tags
        delete tagArr[id]
        setFormData({
            ...formData,
            tags: tagArr
        })
    }

    function handleTagChange(e, id) {
        e.preventDefault()
        const tagArr = formData.tags
        if (e.target.name === 'type') tagArr[id][e.target.name] = e.target.selectedOptions[0].id
        else tagArr[id][e.target.name] = e.target.value
        setFormData({
            ...formData,
            tags: tagArr
        })
    }

    function validateInput() {
        if (!formData.isbn) {
            setErrMsg("Numer ISBN jest wymagany!")
            return false
        } else if (formData.tags.filter(tag => tag.type === "Author").length === 0) {
            setErrMsg("Podanie przynajmniej jednego autora jest wymagane!")
            return false
        } else if (formData.tags.filter(tag => tag.value === "").length !== 0) {
            setErrMsg("Wartości tagów nie mogą być puste!")
            return false
        } else if (formData.tags.filter(tag => tag.type === "").length !== 0) {
            setErrMsg("Typy tagów nie mogą być puste!")
            return false
        }
        return true
    
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validateInput()) {

            let url = servAddr + "/breco/add_book"
            
            let data = new FormData()
            for ( let prop in formData ) {
                if (prop !== 'tags') data.append(prop, formData[prop])
            }
            const tagArr = []
            formData.tags.map((item, idx) => {
                const rec = {}
                rec[item.type] = item.value
                tagArr.push(rec)
            })
            data.append('tags', JSON.stringify(tagArr))
            fetch(url, {
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then(res => {
                if (res.msg === "ok") window.location.reload() 
            })
        }
    }

    return (
        <Container className="col-10 col-md-6" style={{marginTop: '15vh'}}>
            
            <Form>
                <h3 className="text-center">Detale</h3>
                { errMsg &&
                <h5 className="text-danger text-center">{errMsg}</h5>
                }
                <Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} md="8">
                            <Form.Label>Tytuł</Form.Label>
                            <Form.Control 
                             type="text" 
                             name="title" 
                             onChange={handleChange} 
                             value={formData.title} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control 
                             type="text"
                             name="isbn" 
                             onChange={handleChange} 
                             value={formData.isbn} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Opis</Form.Label>
                        <Form.Control 
                         as="textarea" 
                         rows={3} 
                         placeholder="Opisz książkę w przynajmniej 3 zdaniach..."
                         name="description" 
                         onChange={handleChange} 
                         value={formData.description} />
                    </Form.Group>
                    
                    <Form.Row className="mt-3">
                        <Form.Group as={Col} md="2">
                            <Form.Label>Liczba Stron</Form.Label>
                            <Form.Control 
                             type="text"
                             name="pagesNum" 
                             onChange={handleChange} 
                             value={formData.pagesNum} />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Rok Wydania</Form.Label>
                            <Form.Control 
                             type="text"
                             name="year" 
                             onChange={handleChange} 
                             value={formData.year} />
                        </Form.Group>
                    </Form.Row>
                    <hr/>
                    <h3 className="text-center">Tagi</h3>
                    <Button onClick={handleAddTag}>Dodaj nowy tag</Button>
                    {
                        formData.tags.map((item, idx) => 
                        <TagInput 
                         key={idx} 
                         id={idx}
                         details={item} 
                         onDelete={handleTagDelete}
                         onChange={handleTagChange}/>)
                    }
                    <hr/>
                </Form.Group>
                <div className="text-center mt-5">
                    <Button variant="success" size="lg" onClick={handleSubmit}>Dodaj książkę!</Button>
                </div>
                
            </Form>
        </Container>
    )
}

export default BookRequest