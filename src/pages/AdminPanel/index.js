import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const AdminPanel = () => {
    return(
        <Container className="col-10 col-md-6 text-center p-5">
            <h3>Panel Administratora</h3>
            <div>
                <ul>
                <li><Link to="/admin/approve_books">Książki do akceptacji</Link></li>
                <li><Link to="/admin/approve_tags">Tagi do akceptacji</Link></li>
                </ul>
                
            </div>
        </Container>
    )
}

export default AdminPanel