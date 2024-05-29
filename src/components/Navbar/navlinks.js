import React from "react";
import { Nav } from "react-bootstrap";

const NavLinks = () => (
  <Nav>
    <Nav.Item>
      <Nav.Link href="/">Add Product</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/">Dealers</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/">Products</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/">Disabled</Nav.Link>
    </Nav.Item>
  </Nav>
);

export default NavLinks;
