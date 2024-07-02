import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const CancelCheckout = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <h1>May be cart is empty! or Payment failed.</h1>
                    </Col>
                    <Col>
                        <Button variant="primary" href="/products">Explore Products</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CancelCheckout