import React from "react";
import CustomNavbar from "../Navbar/navbar";
import { Button, Col, Container, Row } from "react-bootstrap";

const Checkout = () => {
    return (<>
        <CustomNavbar />
        <Container>
            <Row>
                <Col>
                    <h1>checkout page</h1>
                </Col>
                <Col xs={12}>
                    <form action="http://localhost:3002/charge-products-session" method="POST">
                        <Button variant="success" type="submit">
                            Checkout
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Checkout