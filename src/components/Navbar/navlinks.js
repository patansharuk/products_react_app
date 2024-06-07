import React from "react";
import { Nav } from "react-bootstrap";
import { is_dealer } from "../../utils/authUtils";

const NavLinks = () => (
  <Nav>
    <Nav.Item>
      <Nav.Link href="/">Home</Nav.Link>
    </Nav.Item>
    {is_dealer() ? <Nav.Item>
      <Nav.Link href="/stores">Stores</Nav.Link>
    </Nav.Item> : <span></span>}
    <Nav.Item>
      <Nav.Link href="/stores/products">Products</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/cart">Cart</Nav.Link>
    </Nav.Item>
  </Nav>
);

export default NavLinks;
