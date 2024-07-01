import React from "react";
import { Badge, Nav } from "react-bootstrap";
import { is_customer } from "../../utils/authUtils";
import CartItemsUtil from "../../utils/cartUtils";

const NavLinks = () => (
  <Nav>
    <Nav.Item>
      <Nav.Link href="/">Home</Nav.Link>
    </Nav.Item>
    {!is_customer() ? (
      <Nav.Item>
        <Nav.Link href="/stores">Stores</Nav.Link>
      </Nav.Item>
    ) : (
      <span></span>
    )}
    <Nav.Item>
      <Nav.Link href="/stores/products">Products</Nav.Link>
    </Nav.Item>
    {is_customer() ? (
      <Nav.Item>
        <Nav.Link href="/cart">Cart - <span className="badge bg-success">{CartItemsUtil.cartItemsCount()}</span></Nav.Link>
      </Nav.Item>
    ) : (
      <span></span>
    )}
  </Nav>
);

export default NavLinks;
