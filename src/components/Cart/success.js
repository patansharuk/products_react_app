import React from "react";
import CustomNavbar from "../Navbar/navbar";
import { Button, Col, Container, Row } from "react-bootstrap";
import CartItemsUtil from "../../utils/cartUtils";

const SuccessCheckout = () => {
    CartItemsUtil.clearCartItems()
    return (
        <>
            <CustomNavbar />
            <Container>
                <Row>
                    <Col xs={12}>
                        <h1>Hey! Order placed successfully. Visit products again.</h1>
                    </Col>
                    <Col>
                        <Button variant="primary" href="/stores/products">Explore Products</Button>
                    </Col>
                    <Col>
                        <Button variant="primary" href="/">Home</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SuccessCheckout