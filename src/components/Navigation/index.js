import React from 'react'
import { Nav, Navbar, Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { isLogged, logout, getUser, isAdmin } from '../../utils/auth'

const Navigation = () => {

    return (
        <Navbar bg="primary" variant="dark" sticky="top">
            <Navbar.Brand as={NavLink} to="/">
                breco
            </Navbar.Brand>
            { isLogged() ? (
                <>
                    <Nav>
                        <Nav.Link as={NavLink} to="/">Strona Główna</Nav.Link>
                        <Nav.Link as={NavLink} to="/tag">Tagi</Nav.Link>
                        <Nav.Link as={NavLink} to="/title">Tytuły</Nav.Link>
                        <Nav.Link as={NavLink} to="/ranking">Ranking</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end mr-">
                        <Dropdown alignRight={true}>
                        <Dropdown.Toggle variant="success">{getUser()}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/book_request">
                                    Dodaj książkę
                                </Dropdown.Item>
                                {
                                    isAdmin() &&
                                    <Dropdown.Item as={NavLink} to="/admin">Panel Administratora</Dropdown.Item>
                                }
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => logout()}>Wyloguj się</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </>
            ) : (
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link as={NavLink} to="/login">Logowanie</Nav.Link>
                        <Nav.Link as={NavLink} to="/register">Rejestracja</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            )
            }
        </Navbar>
    )
}

export default Navigation