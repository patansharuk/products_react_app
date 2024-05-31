import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import GlobalComponents from "../_Global/index";
import CartItemsUtil from "../../utils/cartUtils";
import { Container } from "react-bootstrap";

const states = GlobalComponents.states;

const Cart = () => {
  const [cartsState, setCartsState] = useState(states.loading);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchItems = () => {
      const data = CartItemsUtil.getCartItems();
      if (Array.isArray(data)) {
        if (data.length > 0) {
          setCartItems(data);
          setCartsState(states.data);
        } else {
          setCartsState(states.empty_items);
        }
      } else {
        setCartsState(states.empty_items);
      }
    };
    fetchItems();
  }, []);

  const renderCartsComponent = () => {
    return cartItems.map((item) => <h1>{item.title}</h1>);
  };

  return (
    <>
      <CustomNavbar />
      <Container>
        {GlobalComponents.renderComponent(cartsState, renderCartsComponent)}
      </Container>
    </>
  );
};

export default Cart;
