import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import GlobalComponents from "../_Global/index";
import CartItemsUtil from "../../utils/cartUtils";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddToCartButton from "../AddToCartButton/addToCartButton";

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

  const onCartItemDelete = (id) => {
    const filteredCartItems = cartItems.filter((item) => item.id !== id);
    CartItemsUtil.addCartItems(filteredCartItems);
    setCartItems(filteredCartItems);
  };

  const onQuantityIncrement = (itemId) => {
    const modifiedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    CartItemsUtil.addCartItems(modifiedCartItems);
    setCartItems(modifiedCartItems);
  };

  const onQuantityDecrement = (itemId) => {
    let modStatus = true;
    const modifiedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity === 1) {
          onCartItemDelete(itemId);
          modStatus = false;
          return item;
        }
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    if (modStatus) {
      CartItemsUtil.addCartItems(modifiedCartItems);
      setCartItems(modifiedCartItems);
    }
  };

  const renderCartItemColumnHeaders = () => {
    return (
      <Row>
        <Col>Item</Col>
        <Col>Price</Col>
        <Col>Quantity</Col>
        <Col>Sub Total</Col>
        <Col xs={2}>Actions</Col>
      </Row>
    );
  };

  const renderCartItem = (product) => {
    return (
      <Row>
        <Col>{product.title}</Col>
        <Col>${product.price}</Col>
        <Col>
          {
            <AddToCartButton
              product={product}
              onIncrementProduct={onQuantityIncrement}
              onDecrementProduct={onQuantityDecrement}
            />
          }
        </Col>
        <Col>${product.quantity * product.price}</Col>
        <Col xs={2}>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onCartItemDelete(product.id)}
          >
            DEL
          </Button>
        </Col>
      </Row>
    );
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      setCartsState(states.empty_items);
    }
    return (
      <Col md={8} className="mb-3 p-3">
        <h4>Cart Items</h4>
        <Row className="flex-column p-2">
          <Col className="border-danger border-bottom border-3 mb-2">
            {renderCartItemColumnHeaders()}
          </Col>
          {cartItems.map((product) => (
            <Col className="border-bottom mb-2" key={product.id}>
              {renderCartItem(product)}
            </Col>
          ))}
        </Row>
      </Col>
    );
  };

  const renderTotalPrice = () => {
    const summaryDetails = {
      subtotal: CartItemsUtil.subTotal(cartItems),
      deliveryCharges: 100,
      discount: -50,
    };
    const orderTotal = CartItemsUtil.totalPrice(summaryDetails);
    return (
      <Col md={4} className="border p-3">
        <h3 className="border-bottom border-danger border-3">Summary</h3>
        <Row>
          <Col>Sub Total</Col>
          <Col className="text-end">${summaryDetails.subtotal}</Col>
        </Row>
        <Row>
          <Col>Delivery Charges</Col>
          <Col className="text-end">${summaryDetails.deliveryCharges}</Col>
        </Row>
        <Row>
          <Col>Discount</Col>
          <Col className="text-end">${-summaryDetails.discount}</Col>
        </Row>
        <hr />
        <Row>
          <Col>Order Total</Col>
          <Col className="text-end">${orderTotal}</Col>
        </Row>

        <Row>
          <Col>
            <Button className="w-100 mb-3 mt-2" href="/checkout">Proceed to Checkout</Button>
          </Col>
        </Row>
      </Col>
    );
  };

  const renderCartsComponent = () => {
    return (
      <Container>
        <Row>
          {renderCartItems()}
          {renderTotalPrice()}
        </Row>
      </Container>
    );
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
