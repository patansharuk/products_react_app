import React from "react";
import { Nav } from "react-bootstrap";

const NavLinks = () => (
  <Nav>
    <Nav.Item>
      <Nav.Link href="/">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/dealer_details">Dealers</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/products">Products</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/cart">Cart</Nav.Link>
    </Nav.Item>
  </Nav>
);

export default NavLinks;
