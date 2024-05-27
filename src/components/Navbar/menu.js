import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";

const Menu = ({user_details, make_logout}) => (
    <Navbar>
        <Container>
            <div className="d-md-flex">
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as:{" "}
                    <span className="badge bg-info">{user_details.email}</span>
                </Navbar.Text>
                </Navbar.Collapse>
                <hr className="d-md-none"/>
                <Button variant="danger" className="ms-2" onClick={make_logout}>
                Logout
                </Button>
            </div>
        </Container>
    </Navbar>
)

export default Menu